import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RestAuthGuard } from 'src/http/auth/guards/rest-jwt-auth.guard';
import { CreateDishDTO } from './create-dish-input';
import { DishesService } from './dishes.service';

@Controller('dishes')
export class DishesController {
  constructor(private dishesService: DishesService) {}

  @Get(':id')
  getById(@Param('id') dishId: string) {
    return this.dishesService.getById(dishId);
  }

  @Get()
  list(@Query('sectionId') sectionId: string) {
    return this.dishesService.getDishesBySectionId(sectionId);
  }

  @Post()
  @UseGuards(RestAuthGuard)
  create(@Body() data: CreateDishDTO) {
    return this.dishesService.create(data);
  }

  @Delete(':id')
  @UseGuards(RestAuthGuard)
  delete(@Param('id') id: string) {
    return this.dishesService.delete(id);
  }
}
