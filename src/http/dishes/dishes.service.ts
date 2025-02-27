import { CreateDishDTO } from './create-dish-input';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

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

  async create({ title, description, price, sectionId }: CreateDishDTO) {
    const sectionExists = await this.prisma.section.findFirst({
      where: {
        id: sectionId,
      },
    });

    if (!sectionExists) {
      throw new HttpException('Section does not exists.', HttpStatus.NOT_FOUND);
    }

    await this.prisma.dish.create({
      data: {
        title,
        description,
        price,
        sectionId,
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

    // const imagesDish = await this.prisma.media.findMany({
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
