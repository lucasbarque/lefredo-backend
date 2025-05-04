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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RequestCreateDishDTO } from './dto/request-create-dish.dto';
import { DishesService } from './dishes.service';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ClerkAuthGuard } from '../auth/guards/clerk-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { imageFileFilter } from '../medias/medias.utils';

import {
  DishDTO,
  RequestChangePriceDTO,
  RequestUpdateDishDTO,
  RequestUpdateDishExtrasOrderDTO,
  RequestUpdateDishFlavorsOrderDTO,
  RequestUploadDishImageDTO,
  ResponseCreateDishDTO,
  ResponseGetDishesDTO,
  ResponseUploadDishImageDTO,
} from './dto';

@Controller('dishes')
export class DishesController {
  constructor(private dishesService: DishesService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Get Dish By Id',
    operationId: 'getDishById',
  })
  @ApiOkResponse({
    type: DishDTO,
  })
  getById(@Param('id') dishId: string) {
    return this.dishesService.getById(dishId);
  }

  @Get('/slug/:slug/:menuId')
  @ApiOperation({
    summary: 'Get Dishes',
    operationId: 'getDishesBySlug',
  })
  @ApiOkResponse({
    type: ResponseGetDishesDTO,
    isArray: true,
  })
  getBySlug(@Param('slug') slug: string, @Param('menuId') menuId: string) {
    return this.dishesService.getDishesBySlug(slug, menuId);
  }

  @Get()
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Get Dishes',
    operationId: 'getDishesBySectionId',
  })
  @ApiOkResponse({
    type: ResponseGetDishesDTO,
    isArray: true,
  })
  getBySectionId(@Query('sectionId') sectionId: string) {
    return this.dishesService.getDishesBySectionId(sectionId);
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
  @ApiOkResponse({ type: ResponseCreateDishDTO })
  update(@Param('id') id: string, @Body() data: RequestUpdateDishDTO) {
    return this.dishesService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(ClerkAuthGuard)
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

  @Patch('update-dish-extras-order/:id')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Update Dish Extras Order',
    operationId: 'updateDishExtrasOrder',
  })
  @ApiOkResponse()
  updateDishExtrasOrder(
    @Param('id') id: string,
    @Body() data: RequestUpdateDishExtrasOrderDTO,
  ) {
    return this.dishesService.updateDishExtrasOrder(id, data);
  }

  @Patch('update-dish-flavors-order/:id')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Update Dish Flavors Order',
    operationId: 'updateDishFlavorsOrder',
  })
  @ApiOkResponse()
  updateDishFlavorsOrder(
    @Param('id') id: string,
    @Body() data: RequestUpdateDishFlavorsOrderDTO,
  ) {
    return this.dishesService.updateDishFlavorsOrder(id, data);
  }

  @Patch('/:id/upload-image')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Upload dish image',
    operationId: 'uploadDishImage',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiOkResponse({
    type: ResponseUploadDishImageDTO,
  })
  uploadImage(
    @Param('id') id: string,
    @Body() _: RequestUploadDishImageDTO,
    @UploadedFile() files: Express.Multer.File,
  ) {
    return this.dishesService.uploadImage(id, files);
  }

  @Delete('/delete-image/:id')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Delete Dish image',
    operationId: 'deleteDishImage',
  })
  deleteImage(@Param('id') id: string) {
    return this.dishesService.deleteImage(id);
  }
}
