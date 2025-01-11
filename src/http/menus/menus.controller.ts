import { CreateMenuDTO } from './create-menu-dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { RestAuthGuard } from 'src/http/auth/guards/rest-jwt-auth.guard';

@Controller('menus')
@UseGuards(RestAuthGuard)
export class MenusController {
  constructor(private menusService: MenusService) { }

  @Get()
  getByRestaurant(@Query('restaurantId') restaurantId: string) {
    return this.menusService.getMenusByRestaurantId(restaurantId);
  }

  @Get(':id')
  getById(@Param('id') menuId: string) {
    return this.menusService.getById(menuId);
  }

  @Post()
  create(@Body() data: CreateMenuDTO) {
    return this.menusService.create(data);
  }
}
