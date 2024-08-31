import { Injectable } from '@nestjs/common';
import { promises } from 'fs';
import { join } from 'path';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateDishParams {
  title: string;
  description?: string;
  price: number;
  sectionId: string;
}

@Injectable()
export class DishesService {
  constructor(private prisma: PrismaService) {}

  async getDishById(dishId: string) {
    const dish = await this.prisma.dish.findUnique({
      where: {
        id: dishId,
      },
    });

    if (!dish) {
      throw new Error('Dish not found.');
    }

    return dish;
  }

  async getDishesBySectionId(sectionId: string) {
    const sectionExists = await this.prisma.section.findUnique({
      where: {
        id: sectionId,
      },
    });

    if (!sectionExists) {
      throw new Error('Section does not exists.');
    }

    return await this.prisma.dish.findMany({
      where: {
        sectionId,
      },
    });
  }

  async createDish({ title, description, price, sectionId }: CreateDishParams) {
    const sectionExists = await this.prisma.section.findFirst({
      where: {
        id: sectionId,
      },
    });

    if (!sectionExists) {
      throw new Error('Section does not exists.');
    }

    return await this.prisma.dish.create({
      data: {
        title,
        description,
        price,
        sectionId,
      },
    });
  }

  async deleteDishById(id: string) {
    const dishToDelete = await this.prisma.dish.findUnique({
      where: {
        id,
      },
    });

    if (!dishToDelete) {
      throw new Error('Dish not found!');
    }

    const imagesDish = await this.prisma.media.findMany({
      where: {
        referenceName: 'dishes',
        referenceId: id,
      },
    });
    let imagesDeleted = 0;
    let imagesErrored = 0;

    if (imagesDish.length > 0) {
      for (const image of imagesDish) {
        try {
          promises.unlink(
            join(__dirname, '..', '..', '..', 'files', image.filename),
          );
          await this.prisma.media.delete({
            where: {
              id: image.id,
            },
          });
          imagesDeleted++;
        } catch (err) {
          imagesErrored++;
          console.log(err);
        }
      }
    }
    await this.prisma.dish.delete({
      where: {
        id,
      },
    });

    return `We removed the ${dishToDelete.title} | images deleted: ${imagesDeleted} | images with error: ${imagesErrored}`;
  }
}
