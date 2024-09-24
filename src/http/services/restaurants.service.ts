import { CreateResturantDTO } from '@inputs/create-resturant-dto';
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
        userId,
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
        userId,
      },
    });
  }
}
