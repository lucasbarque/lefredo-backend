// import { UseGuards } from '@nestjs/common';

// import { GqlAuthGuard } from 'src/http/auth/guards/gql-jwt-auth.guard';
// import { CreateResturantInput } from 'src/http/rest/inputs/create-resturant-input';
// import { Restaurant } from 'src/http/rest/models/restaurant';

import { CreateResturantDTO } from '@inputs/create-resturant-dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MenusService } from '@services/menus.service';
import { RestaurantsService } from '@services/restaurants.service';
import { RestAuthGuard } from 'src/http/auth/guards/rest-jwt-auth.guard';

@Controller('restaurants')
export class RestaurantsController {
  constructor(
    private restaurantsService: RestaurantsService,
    private menusService: MenusService,
  ) {}

  // getRestaurantById(@Args('restaurantId') restaurantId: string) {
  //   return this.restaurantsService.getRestaurantById(restaurantId);
  // }

  // restaurants() {
  //   return this.restaurantsService.listAllRestaurants();
  // }

  @Post()
  @UseGuards(RestAuthGuard)
  create(@Body() data: CreateResturantDTO) {
    return this.restaurantsService.createRestaurant(data);
  }

  // menus(@Parent() restaurant: Restaurant) {
  //   return this.menusService.getMenusByRestaurantId(restaurant.id);
  // }
}
