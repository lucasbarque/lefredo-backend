import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DishesFlavorsService } from './dishes-flavors.service';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ClerkAuthGuard } from '../auth/guards/clerk-auth.guard';
import { ResponseCreateDishesFlavorsDTO } from './dto/response-create-dishes-flavors.dto';
import { RequestCreateDishesFlavorsDTO } from './dto/request-create-dishes-flavors.dto';
import { RequestUpdateDishesFlavorsDTO } from './dto/request-update-dishes-flavors.dto';
import { DishFlavorsDTO } from './dto/dish-flavors.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { imageFileFilter } from '../medias/medias.utils';
import { RequestUploadDishFlavorImageDTO } from './dto/request-upload-dish-flavor-image';
import { ResponseUploadDishFlavorImageDTO } from './dto/response-upload-dish-flavor-image.dto';

@Controller('dishes-flavors')
export class DishesFlavorsController {
  constructor(private dishesFlavorsService: DishesFlavorsService) {}

  @Get('/:dishId')
  @ApiOperation({
    summary: 'Get Dishes Flavors',
    operationId: 'getDishesFlavors',
  })
  @ApiOkResponse({
    type: DishFlavorsDTO,
    isArray: true,
  })
  getDishesFlavors(@Param('dishId') dishId: string) {
    return this.dishesFlavorsService.getDishesFlavors(dishId);
  }

  @Post('/:dishId')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Create Dish Flavors',
    operationId: 'createDishesFlavors',
  })
  @ApiCreatedResponse({ type: ResponseCreateDishesFlavorsDTO, isArray: true })
  create(
    @Param('dishId') dishId: string,
    @Body() data: RequestCreateDishesFlavorsDTO,
  ) {
    return this.dishesFlavorsService.create(dishId, data);
  }

  @Put(':id')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Update Dish Flavors',
    operationId: 'updateDishesFlavors',
  })
  @ApiOkResponse()
  update(@Param('id') id: string, @Body() data: RequestUpdateDishesFlavorsDTO) {
    return this.dishesFlavorsService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Delete Dish Flavors',
    operationId: 'deleteDishesFlavors',
  })
  @ApiOkResponse()
  delete(@Param('id') id: string) {
    return this.dishesFlavorsService.delete(id);
  }

  @UseGuards(ClerkAuthGuard)
  @Patch('/:id/upload-image')
  @ApiOperation({
    summary: 'Upload dish flavor image',
    operationId: 'uploadDishFlavorImage',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiOkResponse({
    type: ResponseUploadDishFlavorImageDTO,
  })
  uploadImage(
    @Param('id') id: string,
    @Body() _: RequestUploadDishFlavorImageDTO,
    @UploadedFile() files: Express.Multer.File,
  ) {
    return this.dishesFlavorsService.uploadImage(id, files);
  }

  @Delete('/delete-image/:id')
  @ApiOperation({
    summary: 'Delete Dish Flavor Media image',
    operationId: 'deleteDishFlavorMediaImage',
  })
  deleteImage(@Param('id') id: string) {
    return this.dishesFlavorsService.deleteImage(id);
  }
}
