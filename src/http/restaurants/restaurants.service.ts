import { CreateResturantDTO } from './dto/create-resturant-dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UpdateResturantDTO } from './dto/update-restaurant-dto';
import { R2Service } from '../medias/r2.service';
import { randomUUID } from 'node:crypto';
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
          section.Dish.map(async (dish) => {
            const medias = await this.prisma.media.findMany({
              where: {
                referenceId: dish.id,
                referenceName: 'dishes',
              },
            });
            return {
              ...dish,
              medias,
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

  async create({ name }: CreateResturantDTO) {
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
    const fileUrl = await this.s3Service.uploadFile(
      file.buffer,
      filename,
      file.mimetype,
    );

    const restaurantUpdated = await this.prisma.restaurant.update({
      data: {
        logo: fileUrl,
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
}
