import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateMenuParams {
  title: string;
  restaurantId: string;
}

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async getMenuById(id: string) {
    const menu = await this.prisma.menu.findUnique({
      where: {
        id,
      },
    });

    if (!menu) {
      throw new Error('Menu does not exists.');
    }

    return menu;
  }

  async getMenusByRestaurantId(restaurantId: string) {
    const restaurantExists = await this.prisma.restaurant.findUnique({
      where: {
        id: restaurantId,
      },
    });

    if (!restaurantExists) {
      throw new Error('Restaurant does not exists.');
    }

    return await this.prisma.menu.findMany({
      where: {
        restaurantId,
      },
    });
  }

  async createMenu({ title, restaurantId }: CreateMenuParams) {
    const menuTitleExists = await this.prisma.menu.findFirst({
      where: {
        title,
        restaurantId,
      },
    });

    if (menuTitleExists) {
      throw new Error('Menu title already exists.');
    }

    const restaurantExists = await this.prisma.restaurant.findFirst({
      where: {
        id: restaurantId,
      },
    });

    if (!restaurantExists) {
      throw new Error('Restaurant does not exists.');
    }

    return await this.prisma.menu.create({
      data: {
        title,
        restaurantId,
      },
    });
  }
}
