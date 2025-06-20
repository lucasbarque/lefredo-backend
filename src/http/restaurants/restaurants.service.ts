import { CreateResturantDTO } from './dto/create-resturant-dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UpdateResturantDTO } from './dto/update-restaurant-dto';
import { extname } from 'node:path';
import { S3Service } from '../medias/s3.service';

@Injectable()
export class RestaurantsService {
  constructor(
    private prisma: PrismaService,
    private s3Service: S3Service,
  ) {}

  async getById(id: string) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: {
        id,
      },
    });

    if (!restaurant) {
      throw new HttpException('Restaurant not found.', HttpStatus.NOT_FOUND);
    }

    return restaurant;
  }

  async getBySlug(slug: string) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: {
        slug,
      },
      include: {
        Menu: true,
      },
    });

    if (!restaurant) {
      throw new HttpException('Restaurant not found.', HttpStatus.NOT_FOUND);
    }

    return restaurant;
  }

  async update(id: string, data: UpdateResturantDTO) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: {
        id,
      },
    });

    if (!restaurant) {
      throw new HttpException('Restaurant not found.', HttpStatus.NOT_FOUND);
    }

    await this.prisma.restaurant.update({
      where: {
        id,
      },
      data,
    });
  }

  async getAllData({
    menuId,
    restaurantId,
  }: {
    menuId: string;
    restaurantId: string;
  }) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: {
        id: restaurantId,
      },
      include: {
        Menu: {
          where: {
            id: menuId,
          },
        },
      },
    });

    if (!restaurant) {
      throw new HttpException(
        'Restaurant does not exists.',
        HttpStatus.NOT_FOUND,
      );
    }

    const menuExists = await this.prisma.menu.findUnique({
      where: {
        id: menuId,
      },
    });

    if (!menuExists) {
      throw new HttpException('Menu does not exists.', HttpStatus.NOT_FOUND);
    }

    const sections = await this.prisma.section.findMany({
      where: {
        menuId,
      },
      include: {
        Dish: true,
      },
    });

    const sectionsWithDishesAndMedia = await Promise.all(
      sections.map(async (section) => {
        const dishesWithMedia = await Promise.all(
          section.Dish.map((dish) => {
            return {
              ...dish,
            };
          }),
        );

        return {
          ...section,
          Dish: dishesWithMedia,
        };
      }),
    );

    return { restaurant, sections: sectionsWithDishesAndMedia };
  }

  async list() {
    return this.prisma.restaurant.findMany();
  }

  async create({ name, slug }: CreateResturantDTO) {
    const restaurantExists = await this.prisma.restaurant.findFirst({
      where: {
        name,
      },
    });

    if (restaurantExists && restaurantExists.name === name) {
      throw new HttpException(
        'Restaurant name already exists.',
        HttpStatus.CONFLICT,
      );
    }

    await this.prisma.restaurant.create({
      data: {
        slug,
        name,
      },
    });
  }

  async changeLogo(id: string, file: Express.Multer.File) {
    const restaurant = await this.prisma.restaurant.findFirst({
      where: {
        id,
      },
    });

    if (!restaurant) {
      throw new HttpException('Restaurant not found.', HttpStatus.NOT_FOUND);
    }

    if (restaurant.logo) {
      const fileName = restaurant.logo.split('logo-store/')[1];
      await this.s3Service.deleteFile(`logo-store/${fileName}`);
    }

    const filename = `logo-store/${restaurant.id + extname(file.originalname)}`;
    await this.s3Service.uploadFile(file.buffer, filename, file.mimetype);

    const restaurantUpdated = await this.prisma.restaurant.update({
      data: {
        logo: filename,
      },
      where: {
        id,
      },
    });

    return { logo: restaurantUpdated.logo };
  }

  async deleteLogo(restaurantId: string) {
    const restaurant = await this.prisma.restaurant.findFirst({
      where: {
        id: restaurantId,
      },
    });

    if (!restaurant) {
      throw new HttpException('Restaurant not found.', HttpStatus.NOT_FOUND);
    }

    if (restaurant.logo) {
      const fileName = restaurant.logo.split('logo-store/')[1];
      await this.s3Service.deleteFile(`logo-store/${fileName}`);
    }

    await this.prisma.restaurant.update({
      where: {
        id: restaurantId,
      },
      data: {
        logo: '',
      },
    });
  }

  async isFirstCategory(restaurantId: string) {
    const restaurant = await this.prisma.restaurant.findFirst({
      where: {
        id: restaurantId,
      },
      include: {
        Menu: true,
      },
    });

    if (!restaurant) {
      throw new HttpException('Restaurant not found.', HttpStatus.NOT_FOUND);
    }

    if (restaurant.Menu.length === 0) {
      return { isFirstCategory: true };
    }

    const section = await this.prisma.section.findFirst({
      where: {
        menuId: restaurant.Menu[0].id,
      },
    });

    if (!section) {
      return { isFirstCategory: true };
    }
    return { isFirstCategory: false };
  }
}
