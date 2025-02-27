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
import { CreateDishDTO } from './create-dish-input';
import { DishesService } from './dishes.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { GetDishesDTO } from './dto/get-section.dto';
import { GetDishDTO } from './dto/get-dish.dto';

@Controller('dishes')
export class DishesController {
  constructor(private dishesService: DishesService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Get Dish By Id',
    operationId: 'getDishById',
  })
  @ApiOkResponse({
    type: GetDishDTO,
  })
  getById(@Param('id') dishId: string) {
    return this.dishesService.getById(dishId);
  }

  @Get()
  @ApiOperation({
    summary: 'Get Dishes',
    operationId: 'getDishesBySectionId',
  })
  @ApiOkResponse({
    type: GetDishesDTO,
    isArray: true,
  })
  getBySectionId(@Query('sectionId') sectionId: string) {
    return this.dishesService.getDishesBySectionId(sectionId);
  }

  @Get('/slug/:slug')
  @ApiOperation({
    summary: 'Get Dishes',
    operationId: 'getDishesBySlug',
  })
  @ApiOkResponse({
    type: GetDishesDTO,
    isArray: true,
  })
  getBySlug(@Param('slug') slug: string) {
    return this.dishesService.getDishesBySlug(slug);
  }

  @Post()
  create(@Body() data: CreateDishDTO) {
    return this.dishesService.create(data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.dishesService.delete(id);
  }
}
