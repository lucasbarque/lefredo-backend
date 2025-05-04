import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { formatCurrency, slugify } from 'src/lib/utils';
import { RequestCreateDishesFlavorsDTO } from './dto/request-create-dishes-flavors.dto';
import { RequestUpdateDishesFlavorsDTO } from './dto/request-update-dishes-flavors.dto';
import { extname } from 'path';
import { S3Service } from '../medias/s3.service';

@Injectable()
export class DishesFlavorsService {
  constructor(
    private prisma: PrismaService,
    private s3Service: S3Service,
  ) {}

  async getDishesFlavors(dishId: string) {
    const dish = await this.prisma.dish.findUnique({
      where: { id: dishId },
    });
    if (!dish) {
      throw new HttpException('Dish not found.', HttpStatus.NOT_FOUND);
    }
    const dishFlavors = await this.prisma.dishFlavors.findMany({
      where: { dishId },
      include: { dishFlavorsMedias: true },
    });

    const order = dish.dishFlavorsOrder as string[] | null;

    let sortedDishFlavors: typeof dishFlavors | null;

    if (order !== null) {
      sortedDishFlavors = order
        .map((flavorId) => dishFlavors.find((flavor) => flavor.id === flavorId))
        .filter((flavor): flavor is (typeof dishFlavors)[number] =>
          Boolean(flavor),
        );
    } else {
      sortedDishFlavors = null;
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
    const priceAsNumber = price
      ? Number(formatCurrency(price, 'to-decimal'))
      : null;

    const dishFlavors = await this.prisma.dishFlavors.create({
      data: {
        title,
        label,
        price: priceAsNumber,
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
    { title, price, label, description }: RequestUpdateDishesFlavorsDTO,
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

    const priceAsNumber = price
      ? Number(formatCurrency(price, 'to-decimal'))
      : null;

    return await this.prisma.dishFlavors.update({
      data: {
        title,
        label,
        price: priceAsNumber,
        description,
      },
      where: {
        id: dishFlavors.id,
      },
    });
  }

  async delete(id: string) {
    const dishesFlavors = await this.prisma.dishFlavors.findFirst({
      where: { id },
      include: {
        Dish: true,
        dishFlavorsMedias: true,
      },
    });

    if (!dishesFlavors) {
      throw new HttpException('Dish flavor not found.', HttpStatus.NOT_FOUND);
    }

    if (!dishesFlavors.Dish) {
      throw new HttpException(
        'Associated dish not found for this flavor.',
        HttpStatus.NOT_FOUND,
      );
    }

    const orderItems = dishesFlavors.Dish.dishFlavorsOrder as string[] | null;
    const filteredOrder = Array.isArray(orderItems)
      ? orderItems.filter((item) => item !== dishesFlavors.id)
      : [];

    await this.prisma.dish.update({
      where: { id: dishesFlavors.Dish.id },
      data: { dishFlavorsOrder: filteredOrder },
    });

    await Promise.all(
      dishesFlavors.dishFlavorsMedias.map(async (media) => {
        const { id: mediaId, url } = media;
        if (!url) {
          throw new HttpException(
            `Image URL not found for dishFlavorMedia ${mediaId}.`,
            HttpStatus.NOT_FOUND,
          );
        }
        await this.s3Service.deleteFile(url);
        await this.prisma.dishFlavorsMedias.delete({ where: { id: mediaId } });
      }),
    );

    return this.prisma.dishFlavors.delete({ where: { id } });
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

    const mediasCount = await this.prisma.dishFlavorsMedias.count({
      where: {
        dishFlavorId: dishFlavor.id,
        url: {
          not: null,
        },
      },
    });

    if (mediasCount === 3)
      throw new HttpException(
        'It is only permitted to upload some 3 images',
        HttpStatus.CONFLICT,
      );

    const dishFlavorMedia = await this.prisma.dishFlavorsMedias.create({
      data: {
        dishFlavorId: dishFlavor.id,
        title: slugify(dishFlavor.title) + '-' + (mediasCount + 1),
      },
    });

    try {
      const filename = `dish-flavors/${dishFlavorMedia.id + extname(file.originalname)}`;
      await this.s3Service.uploadFile(file.buffer, filename, file.mimetype);

      const dishFlavorMediaUploaded =
        await this.prisma.dishFlavorsMedias.update({
          data: {
            url: filename,
          },
          where: {
            id: dishFlavorMedia.id,
          },
        });
      return dishFlavorMediaUploaded;
    } catch {
      await this.prisma.dishFlavorsMedias.delete({
        where: {
          id: dishFlavorMedia.id,
        },
      });
      throw new HttpException(
        'Failed to upload image.',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async deleteImage(id: string): Promise<void> {
    const media = await this.prisma.dishFlavorsMedias.findFirst({
      where: { id },
    });

    if (!media) {
      throw new HttpException(
        'DishFlavorMedia not found.',
        HttpStatus.NOT_FOUND,
      );
    }

    const { url } = media;
    if (!url) {
      throw new HttpException(
        `Image URL not found for media ${media.id}.`,
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      await this.s3Service.deleteFile(url);
      await this.prisma.dishFlavorsMedias.delete({
        where: { id: media.id },
      });
    } catch {
      throw new HttpException(
        'Failed to delete image.',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
