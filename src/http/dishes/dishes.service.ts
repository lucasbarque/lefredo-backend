import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { RequestChangePriceDTO } from './dto/request-change-price.dto';
import { RequestCreateDishDTO } from './dto/request-create-dish.dto';
import { formatCurrency, slugify } from 'src/lib/utils';
import { RequestUpdateDishDTO } from './dto/request-update-dish.dto';
import { RequestUpdateDishExtrasOrderDTO } from './dto/request-update-dish-extras-order.dto';
import { RequestUpdateDishFlavorsOrderDTO } from './dto/request-update-dish-flavors-order.dto';
import { S3Service } from '../medias/s3.service';
import { extname } from 'path';

@Injectable()
export class DishesService {
  constructor(
    private prisma: PrismaService,
    private s3Service: S3Service,
  ) {}

  async getById(dishId: string) {
    const dish = await this.prisma.dish.findUnique({
      where: {
        id: dishId,
      },
      include: {
        section: true,
        dishExtras: true,
        dishFlavors: {
          include: {
            dishFlavorsMedias: true,
          },
        },
        dishMedias: true,
        dishSpecs: {
          include: {
            DishSpecs: true,
          },
        },
      },
    });

    if (!dish) {
      throw new HttpException('Dish not found.', HttpStatus.NOT_FOUND);
    }

    const orderExtras = dish.dishExtrasOrder as string[] | null;
    let sortedDishExtras: (typeof dish)['dishExtras'];

    if (orderExtras !== null) {
      sortedDishExtras = orderExtras
        .map((extraId) => dish.dishExtras.find((extra) => extra.id === extraId))
        .filter((extra): extra is (typeof dish.dishExtras)[number] =>
          Boolean(extra),
        );
    } else {
      sortedDishExtras = dish.dishExtras;
    }
    dish.dishExtras = sortedDishExtras;

    const orderFlavors = dish.dishFlavorsOrder as string[] | null;
    let sortedDishFlavors: (typeof dish)['dishFlavors'];
    if (orderFlavors !== null) {
      sortedDishFlavors = orderFlavors
        .map((flavorId) =>
          dish.dishFlavors.find((flavor) => flavor.id === flavorId),
        )
        .filter((flavor): flavor is (typeof dish.dishFlavors)[number] =>
          Boolean(flavor),
        );
    } else {
      sortedDishFlavors = dish.dishFlavors;
    }
    dish.dishFlavors = sortedDishFlavors;

    return dish;
  }

  async getDishesBySectionId(sectionId: string) {
    const sectionExists = await this.prisma.section.findUnique({
      where: {
        id: sectionId,
      },
    });

    if (!sectionExists) {
      throw new HttpException('Section does not exists.', HttpStatus.NOT_FOUND);
    }

    const dishes = await this.prisma.dish.findMany({
      where: {
        sectionId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        dishSpecs: {
          include: {
            DishSpecs: true,
          },
        },
        dishMedias: true,
      },
    });

    return dishes;
  }

  async getDishesBySlug(slug: string, menuId: string) {
    const sectionExists = await this.prisma.section.findFirst({
      where: {
        slug,
        menuId,
        isActive: true,
      },
    });

    if (!sectionExists) {
      throw new HttpException('Section does not exists.', HttpStatus.NOT_FOUND);
    }

    const dishes = await this.prisma.dish.findMany({
      where: {
        sectionId: sectionExists.id,
        isActive: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        dishSpecs: {
          include: {
            DishSpecs: true,
          },
        },
        dishMedias: true,
      },
    });

    return dishes;
  }

  async toggle(id: string) {
    const dish = await this.prisma.dish.findUnique({
      where: {
        id,
      },
    });

    if (!dish) {
      throw new HttpException('Dish does not exists.', HttpStatus.NOT_FOUND);
    }

    await this.prisma.dish.update({
      data: {
        isActive: !dish.isActive,
      },
      where: {
        id,
      },
    });
  }

  async changePrice(id: string, { price }: RequestChangePriceDTO) {
    const dish = await this.prisma.dish.findUnique({
      where: {
        id,
      },
    });

    if (!dish) {
      throw new HttpException('Dish does not exists.', HttpStatus.NOT_FOUND);
    }

    await this.prisma.dish.update({
      data: {
        price,
      },
      where: {
        id,
      },
    });
  }

  async create({
    title,
    description,
    price,
    flagged,
    portion,
    prepTime,
    sectionId,
  }: RequestCreateDishDTO) {
    const sectionExists = await this.prisma.section.findFirst({
      where: {
        id: sectionId,
      },
    });

    if (!sectionExists) {
      throw new HttpException('Section does not exists.', HttpStatus.NOT_FOUND);
    }

    const dish = await this.prisma.dish.create({
      data: {
        title,
        description,
        prepTime,
        portion,
        price: Number(formatCurrency(price, 'to-decimal')),
        sectionId,
      },
    });

    if (flagged === 'true') {
      const dishSpec = await this.prisma.dishSpecs.findFirst({
        where: {
          key: 'highlighted',
        },
      });
      await this.prisma.dishSpecsDishes.create({
        data: {
          dishId: dish.id,
          dishSpecsId: dishSpec!.id,
        },
      });
    }

    return dish;
  }

  async update(id: string, data: RequestUpdateDishDTO) {
    const dish = await this.prisma.dish.findUnique({
      where: {
        id,
      },
    });

    if (!dish) {
      throw new HttpException('Dish not found.', HttpStatus.NOT_FOUND);
    }

    const dishSpec = await this.prisma.dishSpecs.findFirst({
      where: {
        key: 'highlighted',
      },
    });

    const isFlagged = await this.prisma.dishSpecsDishes.findFirst({
      where: {
        dishSpecsId: dishSpec!.id,
        dishId: dish.id,
      },
    });

    if (data.flagged === 'true' && !isFlagged) {
      await this.prisma.dishSpecsDishes.create({
        data: {
          dishId: dish.id,
          dishSpecsId: dishSpec!.id,
        },
      });
    } else if (data.flagged === 'false' && isFlagged) {
      await this.prisma.dishSpecsDishes.delete({
        where: {
          dishId_dishSpecsId: {
            dishId: dish.id,
            dishSpecsId: dishSpec!.id,
          },
        },
      });
    }

    await this.prisma.dish.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        description: data.description,
        prepTime: data.prepTime,
        portion: data.portion,
        price: Number(formatCurrency(data.price, 'to-decimal')),
      },
    });
  }

  async delete(id: string): Promise<void> {
    const dishToDelete = await this.prisma.dish.findUnique({
      where: { id },
    });
    if (!dishToDelete) {
      throw new HttpException('Dish not found.', HttpStatus.NOT_FOUND);
    }
    const dishMedias = await this.prisma.dishMedias.findMany({
      where: { dishId: dishToDelete.id },
    });
    await Promise.all(
      dishMedias.map(async (dishMedia) => {
        const { id: mediaId, url } = dishMedia;
        if (!url) {
          throw new HttpException(
            `Image URL not found for dishMedia ${mediaId}.`,
            HttpStatus.NOT_FOUND,
          );
        }
        await this.s3Service.deleteFile(url);
        await this.prisma.dishMedias.delete({
          where: { id: mediaId },
        });
      }),
    );
    const dishFlavors = await this.prisma.dishFlavors.findMany({
      where: { dishId: dishToDelete.id },
      select: { id: true },
    });
    const dishFlavorsIds = dishFlavors.map((f) => f.id);
    const dishFlavorsMedia = await this.prisma.dishFlavorsMedias.findMany({
      where: { dishFlavorId: { in: dishFlavorsIds } },
    });
    await Promise.all(
      dishFlavorsMedia.map(async (flavorMedia) => {
        const { id: mediaId, url } = flavorMedia;
        if (!url) {
          throw new HttpException(
            `Image URL not found for dishFlavorMedia ${mediaId}.`,
            HttpStatus.NOT_FOUND,
          );
        }
        await this.s3Service.deleteFile(url);
        await this.prisma.dishFlavorsMedias.delete({
          where: { id: mediaId },
        });
      }),
    );
    await this.prisma.dish.delete({
      where: { id: dishToDelete.id },
    });
  }

  async updateDishExtrasOrder(
    id: string,
    { orderUpdated }: RequestUpdateDishExtrasOrderDTO,
  ) {
    const dish = await this.prisma.dish.findUnique({
      where: {
        id,
      },
    });

    if (!dish) {
      throw new HttpException('Dish not found.', HttpStatus.NOT_FOUND);
    }

    await this.prisma.dish.update({
      where: {
        id,
      },
      data: {
        dishExtrasOrder: orderUpdated,
      },
    });
  }

  async updateDishFlavorsOrder(
    id: string,
    { orderUpdated }: RequestUpdateDishFlavorsOrderDTO,
  ) {
    const dish = await this.prisma.dish.findUnique({
      where: {
        id,
      },
    });

    if (!dish) {
      throw new HttpException('Dish not found.', HttpStatus.NOT_FOUND);
    }

    await this.prisma.dish.update({
      where: {
        id,
      },
      data: {
        dishFlavorsOrder: orderUpdated,
      },
    });
  }

  async uploadImage(id: string, file: Express.Multer.File) {
    const dish = await this.prisma.dish.findFirst({
      where: {
        id,
      },
    });

    if (!dish) {
      throw new HttpException('Dish not found.', HttpStatus.NOT_FOUND);
    }

    const mediasCount = await this.prisma.dishMedias.count({
      where: {
        dishId: dish.id,
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

    const dishMedia = await this.prisma.dishMedias.create({
      data: {
        dishId: dish.id,
        title: slugify(dish.title),
      },
    });

    try {
      const filename = `dish-medias/${dishMedia.id + extname(file.originalname)}`;
      await this.s3Service.uploadFile(file.buffer, filename, file.mimetype);

      const dishMediaUploaded = await this.prisma.dishMedias.update({
        data: {
          url: filename,
          title: slugify(dish.title) + '-' + dishMedia.id,
        },
        where: {
          id: dishMedia.id,
        },
      });
      return dishMediaUploaded;
    } catch {
      await this.prisma.dishMedias.delete({
        where: {
          id: dishMedia.id,
        },
      });
      throw new HttpException(
        'Failed to upload image.',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
  async deleteImage(id: string): Promise<void> {
    const dishMedia = await this.prisma.dishMedias.findFirst({
      where: { id },
    });
    if (!dishMedia) {
      throw new HttpException('Dish media not found.', HttpStatus.NOT_FOUND);
    }

    const { url } = dishMedia;
    if (!url) {
      throw new HttpException(
        `Image URL not found for dishMedia ${dishMedia.id}.`,
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      await this.s3Service.deleteFile(url);
      await this.prisma.dishMedias.delete({
        where: { id: dishMedia.id },
      });
    } catch {
      throw new HttpException(
        'Failed to delete image.',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
