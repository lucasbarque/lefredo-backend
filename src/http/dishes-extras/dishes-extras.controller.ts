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
import { ResponseGetDishesExtraDTO } from './dto/response-get-dishes-extra.dto';
import { RequestCreateDishesExtraDTO } from './dto/request-create-dishes-extra.dto';
import { ResponseCreateDishesExtraDTO } from './dto/resposne-create-dishes-extra.dto';
import { RequestUpdateDishesExtraDTO } from './dto/request-update-dishes-extra.dto';

@Controller('dishes-extras')
export class DishesExtrasController {
  constructor(private dishesExtrasService: DishesExtrasService) {}

  @Get('/:dishId')
  @ApiOperation({
    summary: 'Get Dishes Extras',
    operationId: 'getDishesExtras',
  })
  @ApiOkResponse({
    type: ResponseGetDishesExtraDTO,
    isArray: true,
  })
  getDishesExtras(@Param('dishId') dishId: string) {
    return this.dishesExtrasService.getDishesExtras(dishId);
  }

  @Post('/:dishId')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Create Dish Extra',
    operationId: 'createDishesExtra',
  })
  @ApiCreatedResponse({ type: ResponseCreateDishesExtraDTO, isArray: true })
  create(
    @Param('dishId') dishId: string,
    @Body() data: RequestCreateDishesExtraDTO,
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
  update(@Param('id') id: string, @Body() data: RequestUpdateDishesExtraDTO) {
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
