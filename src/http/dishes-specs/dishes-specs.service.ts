import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { RequestDishSpecsToggleDTO } from './dto/request-dish-specs-toggle.dto';
import { DishSpecsMap } from './dto/dish-specs.dto';

@Injectable()
export class DishesSpecsService {
  constructor(private prisma: PrismaService) {}

  async getDishesSpecs(dishId: string) {
    return await this.prisma.dishSpecsDishes.findMany({
      where: {
        dishId,
      },
      include: {
        DishSpecs: true,
      },
    });
  }

  async toggle(dishId: string, data: RequestDishSpecsToggleDTO) {
    const dish = await this.prisma.dish.findFirst({
      where: {
        id: dishId,
      },
    });

    if (!dish) {
      throw new HttpException('Dish does not exists.', HttpStatus.NOT_FOUND);
    }

    const dishSpecsDishes = await this.prisma.dishSpecsDishes.findMany({
      where: {
        dishId,
        dishSpecsId: DishSpecsMap[data.key],
      },
    });

    let oldStateIsActive: boolean;
    let newStateIsActive: boolean;
    if (dishSpecsDishes.length > 0) {
      await this.prisma.dishSpecsDishes.delete({
        where: {
          dishId_dishSpecsId: {
            dishId,
            dishSpecsId: DishSpecsMap[data.key],
          },
        },
      });
      oldStateIsActive = true;
      newStateIsActive = false;
    } else {
      await this.prisma.dishSpecsDishes.create({
        data: {
          dishId,
          dishSpecsId: DishSpecsMap[data.key],
        },
      });
      oldStateIsActive = false;
      newStateIsActive = true;
    }

    return {
      key: data.key,
      oldStateIsActive,
      newStateIsActive,
    };
  }
}
