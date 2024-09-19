import { CreateResturantDTO } from '@inputs/create-resturant-dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  async getRestaurantById(restaurantId: string) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: {
        id: restaurantId,
      },
    });

    if (!restaurant) {
      throw new Error('Restaurant not found.');
    }

    return restaurant;
  }

  async listAllRestaurants() {
    return this.prisma.restaurant.findMany();
  }

  async createRestaurant({ name, userId }: CreateResturantDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    return await this.prisma.restaurant.create({
      data: {
        name,
        userId,
      },
    });
  }
}
