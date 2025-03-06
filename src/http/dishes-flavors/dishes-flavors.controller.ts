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
import { DishesFlavorsService } from './dishes-flavors.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ClerkAuthGuard } from '../auth/guards/clerk-auth.guard';
import { ResponseGetDishesFlavorsDTO } from './dto/response-get-dishes-flavors.dto';
import { ResponseCreateDishesFlavorsDTO } from './dto/response-create-dishes-flavors.dto';
import { RequestCreateDishesFlavorsDTO } from './dto/request-create-dishes-flavors.dto';
import { RequestUpdateDishesFlavorsDTO } from './dto/request-update-dishes-flavors.dto';

@Controller('dishes-flavors')
export class DishesFlavorsController {
  constructor(private dishesFlavorsService: DishesFlavorsService) {}

  @Get('/:dishId')
  @ApiOperation({
    summary: 'Get Dishes Flavors',
    operationId: 'getDishesFlavors',
  })
  @ApiOkResponse({
    type: ResponseGetDishesFlavorsDTO,
    isArray: true,
  })
  getDishesFlavors(@Param('dishId') dishId: string) {
    return this.dishesFlavorsService.getDishesFlavors(dishId);
  }

  // @Post('/:dishId')
  // @UseGuards(ClerkAuthGuard)
  // @ApiOperation({
  //   summary: 'Create Dish Flavors',
  //   operationId: 'createDishesFlavors',
  // })
  // @ApiCreatedResponse({ type: ResponseCreateDishesFlavorsDTO, isArray: true })
  // create(
  //   @Param('dishId') dishId: string,
  //   @Body() data: RequestCreateDishesFlavorsDTO,
  // ) {
  //   return this.dishesFlavorsService.create(dishId, data);
  // }

  // @Put(':id')
  // @UseGuards(ClerkAuthGuard)
  // @ApiOperation({
  //   summary: 'Update Dish Flavors',
  //   operationId: 'updateDishesFlavors',
  // })
  // @ApiOkResponse()
  // update(@Param('id') id: string, @Body() data: RequestUpdateDishesFlavorsDTO) {
  //   return this.dishesFlavorsService.update(id, data);
  // }

  // @Delete(':id')
  // @UseGuards(ClerkAuthGuard)
  // @ApiOperation({
  //   summary: 'Delete Dish Flavors',
  //   operationId: 'deleteDishesFlavors',
  // })
  // @ApiOkResponse()
  // delete(@Param('id') id: string) {
  //   return this.dishesFlavorsService.delete(id);
  // }
}
