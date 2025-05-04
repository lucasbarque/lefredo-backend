import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getAllCategories(menuId: string) {
    const count = await this.prisma.section.count({
      where: {
        menuId,
      },
    });
    return count;
  }

  async getAllDishes(menuId: string) {
    const count = await this.prisma.dish.count({
      where: {
        section: {
          menuId: menuId,
        },
      },
    });
    return count;
  }

  async getAllDishFlavors(menuId: string) {
    const count = await this.prisma.dishFlavors.count({
      where: {
        Dish: {
          section: {
            menuId: menuId,
          },
        },
      },
    });

    return count;
  }

  async hasLogo(restaurantId: string) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: {
        id: restaurantId,
      },
    });

    if (!restaurant) return false;

    return !!restaurant.logo;
  }

  async hasActiveCategory(menuId: string) {
    const section = await this.prisma.section.findFirst({
      where: {
        menuId: menuId,
        isActive: true,
      },
    });

    return !!section;
  }
}
