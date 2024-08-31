import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/http/auth/guards/gql-jwt-auth.guard';

import { MenusService } from '@services/menus.service';
import { RestaurantsService } from '@services/restaurants.service';

import { Restaurant } from '@models/restaurant';

import { CreateResturantInput } from '@inputs/create-resturant-input';

@Resolver(() => Restaurant)
export class RestaurantsResolver {
  constructor(
    private restaurantsService: RestaurantsService,
    private menusService: MenusService,
  ) {}

  @Query(() => Restaurant)
  getRestaurantById(@Args('restaurantId') restaurantId: string) {
    return this.restaurantsService.getRestaurantById(restaurantId);
  }

  @Query(() => [Restaurant])
  restaurants() {
    return this.restaurantsService.listAllRestaurants();
  }

  @Mutation(() => Restaurant)
  @UseGuards(GqlAuthGuard)
  createRestaurant(@Args('data') data: CreateResturantInput) {
    return this.restaurantsService.createRestaurant(data);
  }

  @ResolveField()
  menus(@Parent() restaurant: Restaurant) {
    return this.menusService.getMenusByRestaurantId(restaurant.id);
  }
}
