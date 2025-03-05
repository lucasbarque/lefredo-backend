import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { DishesSpecsService } from './dishes-specs.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ClerkAuthGuard } from '../auth/guards/clerk-auth.guard';
import { DishSpecsDTO } from './dto/dish-specs.dto';
import { RequestDishSpecsToggleDTO } from './dto/request-dish-specs-toggle.dto';
import { ResponseDishSpecsToggleDTO } from './dto/response-dish-specs-toggle.dto';

@Controller('dishes-specs')
export class DishesSpecsController {
  constructor(private dishesSpecsService: DishesSpecsService) {}

  @Get(':dishId')
  // @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Get Dishes Specs',
    operationId: 'getDishesSpecs',
  })
  @ApiOkResponse({
    type: DishSpecsDTO,
    isArray: true,
  })
  getDishesSpecs(@Param('dishId') dishId: string) {
    return this.dishesSpecsService.getDishesSpecs(dishId);
  }

  @Patch(':dishId')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Toggle Dish Spec',
    operationId: 'toggleDishesSpec',
  })
  @ApiOkResponse({ type: ResponseDishSpecsToggleDTO })
  @HttpCode(200)
  toggle(
    @Param('dishId') dishId: string,
    @Body() data: RequestDishSpecsToggleDTO,
  ) {
    return this.dishesSpecsService.toggle(dishId, data);
  }
}
