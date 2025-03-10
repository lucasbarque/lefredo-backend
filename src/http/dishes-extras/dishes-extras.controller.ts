import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DishesExtrasService } from './dishes-extras.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ClerkAuthGuard } from '../auth/guards/clerk-auth.guard';
import {
  RequestCreateDishExtraDTO,
  RequestUpdateDishExtraDTO,
  ResponseCreateDishExtraDTO,
  ResponseGetDishExtraDTO,
} from './dto';

@Controller('dishes-extras')
export class DishesExtrasController {
  constructor(private dishesExtrasService: DishesExtrasService) {}

  @Get(':dishId')
  @ApiOperation({
    summary: 'Get Dishes Extras',
    operationId: 'getDishesExtras',
  })
  @ApiOkResponse({
    type: ResponseGetDishExtraDTO,
    isArray: true,
  })
  getDishesExtras(@Param('dishId') dishId: string) {
    return this.dishesExtrasService.getDishesExtras(dishId);
  }

  @Post(':dishId')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Create Dish Extra',
    operationId: 'createDishesExtra',
  })
  @ApiCreatedResponse({ type: ResponseCreateDishExtraDTO, isArray: true })
  create(
    @Param('dishId') dishId: string,
    @Body() data: RequestCreateDishExtraDTO,
  ) {
    return this.dishesExtrasService.create(dishId, data);
  }

  @Put(':id')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Update Dish Extra',
    operationId: 'updateDishesExtra',
  })
  @ApiOkResponse()
  update(@Param('id') id: string, @Body() data: RequestUpdateDishExtraDTO) {
    return this.dishesExtrasService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Delete Dish Extra',
    operationId: 'deleteDishesExtra',
  })
  @ApiOkResponse()
  delete(@Param('id') id: string) {
    return this.dishesExtrasService.delete(id);
  }
}
