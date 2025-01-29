import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UpdateMenuDTO } from './update-menu-dto';

interface CreateMenuParams {
  title: string;
  restaurantId: string;
}

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    const menu = await this.prisma.menu.findUnique({
      where: {
        id,
      },
    });

    if (!menu) {
      throw new HttpException('Menu does not exists.', HttpStatus.NOT_FOUND);
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
      throw new HttpException(
        'Restaurant does not exists.',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.menu.findMany({
      where: {
        restaurantId,
      },
    });
  }

  async create({ title, restaurantId }: CreateMenuParams) {
    const menuTitleExists = await this.prisma.menu.findFirst({
      where: {
        title,
        restaurantId,
      },
    });

    if (menuTitleExists) {
      throw new HttpException(
        'Menu title already exists.',
        HttpStatus.CONFLICT,
      );
    }

    const restaurantExists = await this.prisma.restaurant.findFirst({
      where: {
        id: restaurantId,
      },
    });

    if (!restaurantExists) {
      throw new HttpException(
        'Restaurant does not exists.',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.prisma.menu.create({
      data: {
        title,
        restaurantId,
      },
    });
  }

  async update(id: string, data: UpdateMenuDTO) {
    const menu = await this.prisma.menu.findFirst({
      where: {
        id,
      },
    });

    if (!menu) {
      throw new HttpException('Menu does not exists.', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.menu.update({
      where: {
        id,
      },
      data,
    });
  }
}
