import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { formatCurrency } from 'src/lib/utils';
import { RequestCreateDishesExtraDTO } from './dto/request-create-dishes-extra.dto';
import { RequestUpdateDishesExtraDTO } from './dto/request-update-dishes-extra.dto';

@Injectable()
export class DishesExtrasService {
  constructor(private prisma: PrismaService) {}

  async getDishesExtras(dishId: string) {
    const dish = await this.prisma.dish.findUnique({
      where: { id: dishId },
    });

    if (!dish) {
      throw new HttpException('Dish not found.', HttpStatus.NOT_FOUND);
    }

    const dishExtras = await this.prisma.dishExtras.findMany({
      where: { dishId },
    });

    const order = dish.dishExtrasOrder as string[] | null;

    let sortedDishExtras;
    if (order !== null) {
      sortedDishExtras = order
        .map((extraId) => dishExtras.find((extra) => extra.id === extraId))
        .filter((extra): extra is (typeof dishExtras)[number] =>
          Boolean(extra),
        );
    } else {
      sortedDishExtras = order;
    }

    return sortedDishExtras;
  }

  async create(dishId: string, { title, price }: RequestCreateDishesExtraDTO) {
    const dish = await this.prisma.dish.findFirst({
      where: {
        id: dishId,
      },
    });

    if (!dish) {
      throw new HttpException('Dish does not exists.', HttpStatus.NOT_FOUND);
    }

    const dishExtra = await this.prisma.dishExtras.create({
      data: {
        title,
        price: Number(formatCurrency(price, 'to-decimal')),
        dishId,
      },
    });

    let orderUpdated = dish.dishExtrasOrder as string[] | null;
    if (orderUpdated === null) {
      orderUpdated = [dishExtra.id];
    } else {
      orderUpdated.push(dishExtra.id);
    }

    await this.prisma.dish.update({
      data: {
        dishExtrasOrder: orderUpdated,
      },
      where: {
        id: dishId,
      },
    });

    return dishExtra;
  }

  async update(id: string, { title, price }: RequestUpdateDishesExtraDTO) {
    const dishExtra = await this.prisma.dishExtras.findFirst({
      where: {
        id,
      },
    });

    if (!dishExtra) {
      throw new HttpException(
        'Dish Extra does not exists.',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.dishExtras.update({
      data: {
        title,
        price: Number(formatCurrency(price, 'to-decimal')),
      },
      where: {
        id: dishExtra.id,
      },
    });
  }

  async delete(id: string) {
    const dishesExtra = await this.prisma.dishExtras.findFirst({
      where: {
        id,
      },
      include: {
        Dish: true,
      },
    });

    if (!dishesExtra) {
      throw new HttpException(
        'DishesExtra does not exists.',
        HttpStatus.NOT_FOUND,
      );
    }
    const orderItems = dishesExtra.Dish.dishExtrasOrder as string[];
    const orderUpdated = orderItems.filter((item) => item !== dishesExtra.id);

    await this.prisma.dish.update({
      data: {
        dishExtrasOrder: orderUpdated,
      },
      where: {
        id: dishesExtra.Dish.id,
      },
    });

    return await this.prisma.dishExtras.delete({
      where: {
        id,
      },
    });
  }
}
