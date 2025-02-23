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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { ClerkAuthGuard } from '../auth/guards/clerk-auth.guard';
import { ApiConsumes, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { GetRestaurantByIdDTO } from './dto/get-restaurant-by-id.dto';
import { UpdateResturantDTO } from './dto/update-restaurant-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { imageFileFilter } from '../medias/medias.utils';
import { ChangeLogoResponseDTO } from './dto/change-logo-response.dto';
import { ChangeLogoDTO } from './dto/change-logo.dto';

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

  @UseGuards(ClerkAuthGuard)
  @Patch('/:id/change-logo')
  @ApiOperation({
    summary: 'Change Logo',
    operationId: 'changeLogoRestaurant',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiOkResponse({
    type: ChangeLogoResponseDTO,
  })
  changeLogo(
    @Param('id') id: string,
    @Body() body: ChangeLogoDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.restaurantsService.changeLogo(id, file);
  }

  @Post()
  create(@Body() data: CreateResturantDTO) {
    return this.restaurantsService.create(data);
  }
}
