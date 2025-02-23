import { CreateResturantDTO } from './dto/create-resturant-dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { ClerkAuthGuard } from '../auth/guards/clerk-auth.guard';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { GetRestaurantByIdDTO } from './dto/get-restaurant-by-id.dto';
import { UpdateResturantDTO } from './dto/update-restaurant-dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

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

  @UseGuards(ClerkAuthGuard)
  @Get(':id')
  @ApiOperation({
    summary: 'Get Restaurant By Id',
    operationId: 'getRestaurantById',
  })
  @ApiOkResponse({
    type: GetRestaurantByIdDTO,
  })
  getById(@Param('id') id: string) {
    return this.restaurantsService.getById(id);
  }

  @UseGuards(ClerkAuthGuard)
  @Put(':id')
  @ApiOperation({
    summary: 'Update Restaurant',
    operationId: 'updateRestaurant',
  })
  update(@Param('id') id: string, @Body() data: UpdateResturantDTO) {
    return this.restaurantsService.update(id, data);
  }

  @Post()
  create(@Body() data: CreateResturantDTO) {
    return this.restaurantsService.create(data);
  }
}
