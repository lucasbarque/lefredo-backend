import { CreateMenuDTO } from './create-menu-dto';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MenusService } from './menus.service';
import { UpdateMenuDTO } from './update-menu-dto';

@Controller('menus')
export class MenusController {
  constructor(private menusService: MenusService) {}
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

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateMenuDTO) {
    return this.menusService.update(id, data);
  }
}
