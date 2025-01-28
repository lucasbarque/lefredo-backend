import { CreateResturantDTO } from './create-resturant-dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

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

  async create({ name, userId }: CreateResturantDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

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
}
