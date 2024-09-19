// import { CreateDishInput } from 'src/http/rest/dtol/create-dish-input';
import { MediasService } from 'src/http/rest/medias/medias.service';

import { DishesService } from '@services/dishes.service';
import { SectionsService } from '@services/sections.service';

export class DishesResolver {
  constructor(
    private dishesService: DishesService,
    private sectionsService: SectionsService,
    private mediasService: MediasService,
  ) {}

  // getDishById(@Args('dishId') dishId: string) {
  //   return this.dishesService.getDishById(dishId);
  // }

  // getDishes(@Args('sectionId') sectionId: string) {
  //   return this.dishesService.getDishesBySectionId(sectionId);
  // }

  // createDish(@Args('data') data: CreateDishInput) {
  //   return this.dishesService.createDish(data);
  // }

  // deleteDishById(@Args('id') id: string) {
  //   return this.dishesService.deleteDishById(id);
  // }

  // images(@Parent() dish: Dish) {
  //   return this.mediasService.getMediasByReferenceName('dishes', dish.id);
  // }

  // section(@Parent() dish: Dish) {
  //   return this.sectionsService.getSectionById(dish.sectionId);
  // }
}
