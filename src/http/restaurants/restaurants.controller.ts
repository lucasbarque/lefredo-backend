import { CreateResturantDTO } from './create-resturant-dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestAuthGuard } from 'src/http/auth/guards/rest-jwt-auth.guard';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) { }

  @Get()
  //TODO: Retornar apenas restaurantes daquele usuário
  list(
    @Query('menuId') menuId: string,
    @Query('restaurantId') restaurantId: string,
  ) {
    if (menuId) {
      return this.restaurantsService.getAllData({ menuId, restaurantId });
    } else {
      return this.restaurantsService.list();
    }
  }

  @UseGuards(RestAuthGuard)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.restaurantsService.getById(id);
  }

  @UseGuards(RestAuthGuard)
  @Post()
  create(@Body() data: CreateResturantDTO) {
    return this.restaurantsService.create(data);
  }
}
