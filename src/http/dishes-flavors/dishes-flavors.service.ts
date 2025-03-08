import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { formatCurrency } from 'src/lib/utils';
import { RequestCreateDishesFlavorsDTO } from './dto/request-create-dishes-flavors.dto';
import { RequestUpdateDishesFlavorsDTO } from './dto/request-update-dishes-flavors.dto';
import { extname } from 'path';

@Injectable()
export class DishesFlavorsService {
  constructor(private prisma: PrismaService) {}

  async getDishesFlavors(dishId: string) {
    const dish = await this.prisma.dish.findUnique({
      where: { id: dishId },
    });

    if (!dish) {
      throw new HttpException('Dish not found.', HttpStatus.NOT_FOUND);
    }

    const dishFlavors = await this.prisma.dishFlavors.findMany({
      where: { dishId },
      include: {
        dishFlavorsMedias: true,
      },
    });

    const order = dish.dishFlavorsOrder as string[] | null;

    let sortedDishFlavors;
    if (order !== null) {
      sortedDishFlavors = order
        .map((flavorId) => dishFlavors.find((flavor) => flavor.id === flavorId))
        .filter((flavor): flavor is (typeof dishFlavors)[number] =>
          Boolean(flavor),
        );
    } else {
      sortedDishFlavors = order;
    }

    return sortedDishFlavors;
  }

  async create(
    dishId: string,
    { title, price, label, description }: RequestCreateDishesFlavorsDTO,
  ) {
    const dish = await this.prisma.dish.findFirst({
      where: {
        id: dishId,
      },
    });

    if (!dish) {
      throw new HttpException('Dish does not exists.', HttpStatus.NOT_FOUND);
    }

    const dishFlavors = await this.prisma.dishFlavors.create({
      data: {
        title,
        label,
        price: Number(formatCurrency(price, 'to-decimal')) || null,
        description,
        dishId,
      },
    });

    let orderUpdated = dish.dishFlavorsOrder as string[] | null;
    if (orderUpdated === null) {
      orderUpdated = [dishFlavors.id];
    } else {
      orderUpdated.push(dishFlavors.id);
    }

    await this.prisma.dish.update({
      data: {
        dishFlavorsOrder: orderUpdated,
      },
      where: {
        id: dishId,
      },
    });

    return dishFlavors;
  }

  async update(
    id: string,
    { title, price, description }: RequestUpdateDishesFlavorsDTO,
  ) {
    const dishFlavors = await this.prisma.dishFlavors.findFirst({
      where: {
        id,
      },
    });

    if (!dishFlavors) {
      throw new HttpException(
        'Dish Flavors does not exists.',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.dishFlavors.update({
      data: {
        title,
        price: Number(formatCurrency(price, 'to-decimal')) || null,
        description,
      },
      where: {
        id: dishFlavors.id,
      },
    });
  }

  async delete(id: string) {
    const dishesFlavors = await this.prisma.dishFlavors.findFirst({
      where: {
        id,
      },
      include: {
        Dish: true,
      },
    });

    if (!dishesFlavors) {
      throw new HttpException(
        'DishesFlavors does not exists.',
        HttpStatus.NOT_FOUND,
      );
    }
    const orderItems = dishesFlavors.Dish.dishFlavorsOrder as string[];
    const orderUpdated = orderItems.filter((item) => item !== dishesFlavors.id);

    await this.prisma.dish.update({
      data: {
        dishFlavorsOrder: orderUpdated,
      },
      where: {
        id: dishesFlavors.Dish.id,
      },
    });

    return await this.prisma.dishFlavors.delete({
      where: {
        id,
      },
    });
  }

  async uploadImage(id: string, file: Express.Multer.File) {
    const dishFlavor = await this.prisma.dishFlavors.findFirst({
      where: {
        id,
      },
    });

    if (!dishFlavor) {
      throw new HttpException('DishFlavor not found.', HttpStatus.NOT_FOUND);
    }

    // const dishFlavorMedia = await this.prisma.dishFlavorsMedias.create({
    //   data: {
    //     dishFlavorId: dishFlavor.id,
    //     url: filename,
    //     title: 'titel',
    //   }
    // })

    // const filename = `dish-flavors/${restaurant.id + extname(file.originalname)}`;
    // await this.s3Service.uploadFile(file.buffer, filename, file.mimetype);

    // const restaurantUpdated = await this.prisma.restaurant.update({
    //   data: {
    //     logo: filename,
    //   },
    //   where: {
    //     id,
    //   },
    // });

    // return { logo: restaurantUpdated.logo };
  }
}
