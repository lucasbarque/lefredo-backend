import { CreateUserDTO } from './create-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getByRestaurantId(restaurantId: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        restaurantId,
      },
    });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async changeOnboardingStatus(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    await this.prisma.user.update({
      data: {
        onboardingFinished: !user.onboardingFinished,
      },
      where: {
        id,
      },
    });
  }

  async list() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async create({ name, email, restaurantId, clerkId }: CreateUserDTO) {
    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
        restaurantId,
      },
    });

    if (userWithSameEmail) {
      throw new HttpException(
        'Another user with same email already exists.',
        HttpStatus.CONFLICT,
      );
    }

    const restaurant = await this.prisma.restaurant.findUnique({
      where: {
        id: restaurantId,
      },
    });
    if (!restaurant) {
      throw new HttpException('Restaurant not found.', HttpStatus.BAD_REQUEST);
    }

    await this.prisma.user.create({
      data: {
        name,
        email,
        restaurantId,
        clerkId,
      },
    });
  }
}
