import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { MediasService } from 'src/http/rest/medias/medias.service';

import { DishesService } from '@services/dishes.service';
import { SectionsService } from '@services/sections.service';

import { Dish } from '@models/dish';

import { CreateDishInput } from '@inputs/create-dish-input';

@Resolver(() => Dish)
export class DishesResolver {
  constructor(
    private dishesService: DishesService,
    private sectionsService: SectionsService,
    private mediasService: MediasService,
  ) {}

  @Query(() => Dish)
  getDishById(@Args('dishId') dishId: string) {
    return this.dishesService.getDishById(dishId);
  }

  @Query(() => [Dish])
  getDishes(@Args('sectionId') sectionId: string) {
    return this.dishesService.getDishesBySectionId(sectionId);
  }

  @Mutation(() => Dish)
  createDish(@Args('data') data: CreateDishInput) {
    return this.dishesService.createDish(data);
  }

  @Mutation(() => String)
  deleteDishById(@Args('id') id: string) {
    return this.dishesService.deleteDishById(id);
  }

  @ResolveField()
  images(@Parent() dish: Dish) {
    return this.mediasService.getMediasByReferenceName('dishes', dish.id);
  }

  @ResolveField()
  section(@Parent() dish: Dish) {
    return this.sectionsService.getSectionById(dish.sectionId);
  }
}
