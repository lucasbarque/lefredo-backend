import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RequestCreateDishDTO } from './dto/request-create-dish.dto';
import { DishesService } from './dishes.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { GetDishesDTO } from './dto/get-section.dto';
import { GetDishDTO } from './dto/get-dish.dto';
import { ClerkAuthGuard } from '../auth/guards/clerk-auth.guard';
import { RequestChangePriceDTO } from './dto/request-change-price.dto';
import { ResponseCreateDishDTO } from './dto/response-create-dish.dto';
import { RequestUpdateDishDTO } from './dto/request-update-dish.dto';
import { ResponseGetDishesExtraDTO } from './dto/response-get-dish-extras.dto';

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
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Create Dish',
    operationId: 'createDish',
  })
  @ApiCreatedResponse({ type: ResponseCreateDishDTO })
  create(@Body() data: RequestCreateDishDTO) {
    return this.dishesService.create(data);
  }

  @Put(':id')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Update Dish',
    operationId: 'updateDish',
  })
  @ApiCreatedResponse({ type: ResponseCreateDishDTO })
  update(@Param('id') id: string, @Body() data: RequestUpdateDishDTO) {
    return this.dishesService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete dish',
    operationId: 'deleteDish',
  })
  @ApiOkResponse()
  delete(@Param('id') id: string) {
    return this.dishesService.delete(id);
  }

  @Patch('toggle/:id')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Toggle Section',
    operationId: 'toggleDish',
  })
  @ApiOkResponse()
  toggle(@Param('id') id: string) {
    return this.dishesService.toggle(id);
  }

  @Patch('change-price/:id')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Change Price',
    operationId: 'changePrice',
  })
  @ApiOkResponse()
  changePrice(@Param('id') id: string, @Body() data: RequestChangePriceDTO) {
    return this.dishesService.changePrice(id, data);
  }

  @Get('/dish-extras/:id')
  @ApiOperation({
    summary: 'Get Dishes Extras',
    operationId: 'getDishExtras',
  })
  @ApiOkResponse({
    type: ResponseGetDishesExtraDTO,
    isArray: true,
  })
  getDishExtras(@Param('id') id: string) {
    return this.dishesService.getDishesExtras(id);
  }
}
