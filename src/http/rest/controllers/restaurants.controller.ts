import { CreateResturantDTO } from '@inputs/create-resturant-dto';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RestaurantsService } from '@services/restaurants.service';
import { RestAuthGuard } from 'src/http/auth/guards/rest-jwt-auth.guard';

@Controller('restaurants')
@UseGuards(RestAuthGuard)
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get()
  //TODO: Retornar apenas restaurantes daquele usuário
  list() {
    return this.restaurantsService.list();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.restaurantsService.getById(id);
  }

  @Post()
  create(@Body() data: CreateResturantDTO) {
    return this.restaurantsService.create(data);
  }
}
