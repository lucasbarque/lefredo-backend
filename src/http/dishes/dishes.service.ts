import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { RequestChangePriceDTO } from './dto/request-change-price.dto';
import { RequestCreateDishDTO } from './dto/request-create-dish.dto';
import { formatCurrency } from 'src/lib/utils';
import { RequestUpdateDishDTO } from './dto/request-update-dish.dto';

@Injectable()
export class DishesService {
  constructor(private prisma: PrismaService) {}

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

    let medias;
    if (dish.dishFlavors.length > 0) {
    } else {
    }

    Object.assign(dish, { medias });

    return dish;
  }

  async getDishesBySectionId(sectionId: string) {
    // await new Promise((resolve) => setTimeout(resolve, 2000));

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
      include: {
        dishSpecs: {
          include: {
            DishSpecs: true,
          },
        },
      },
    });

    return dishes;
  }

  async getDishesBySlug(slug: string) {
    const sectionExists = await this.prisma.section.findUnique({
      where: {
        slug,
      },
    });

    if (!sectionExists) {
      throw new HttpException('Section does not exists.', HttpStatus.NOT_FOUND);
    }

    const dishes = await this.prisma.dish.findMany({
      where: {
        sectionId: sectionExists.id,
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
          dishSpecsId: dishSpec.id,
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
        dishSpecsId: dishSpec.id,
        dishId: dish.id,
      },
    });

    if (data.flagged === 'true' && !isFlagged) {
      await this.prisma.dishSpecsDishes.create({
        data: {
          dishId: dish.id,
          dishSpecsId: dishSpec.id,
        },
      });
    } else if (data.flagged === 'false' && isFlagged) {
      await this.prisma.dishSpecsDishes.delete({
        where: {
          dishId_dishSpecsId: {
            dishId: dish.id,
            dishSpecsId: dishSpec.id,
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

  async delete(id: string) {
    const dishToDelete = await this.prisma.dish.findUnique({
      where: {
        id,
      },
    });

    if (!dishToDelete) {
      throw new HttpException('Dish not found.', HttpStatus.NOT_FOUND);
    }

    //   where: {
    //     referenceName: 'dishes',
    //     referenceId: id,
    //   },
    // });
    let imagesDeleted = 0;
    let imagesErrored = 0;

    // if (imagesDish.length > 0) {
    //   for (const image of imagesDish) {
    //     try {
    //       await this.prisma.media.delete({
    //         where: {
    //           id: image.id,
    //         },
    //       });
    //       imagesDeleted++;
    //     } catch (err) {
    //       imagesErrored++;
    //       console.log(err);
    //     }
    //   }
    // }
    await this.prisma.dish.delete({
      where: {
        id,
      },
    });

    return {
      message: `We removed the ${dishToDelete.title} | images deleted: ${imagesDeleted} | images with error: ${imagesErrored}`,
    };
  }
}
