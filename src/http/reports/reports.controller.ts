import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ClerkAuthGuard } from '../auth/guards/clerk-auth.guard';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('/get-all-categories/:menuId')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Get all categories report',
    operationId: 'getAllCategoriesReport',
  })
  @ApiOkResponse({
    type: Number,
  })
  getAllCategories(@Param('menuId') menuId: string) {
    return this.reportsService.getAllCategories(menuId);
  }

  @Get('/get-all-dishes/:menuId')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Get all dishes report',
    operationId: 'getAllDishesReport',
  })
  @ApiOkResponse({
    type: Number,
  })
  getAllDishes(@Param('menuId') menuId: string) {
    return this.reportsService.getAllDishes(menuId);
  }

  @Get('/get-all-dish-flavors/:menuId')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Get all dish flavors report',
    operationId: 'getAllDishFlavorsReport',
  })
  @ApiOkResponse({
    type: Number,
  })
  getAllDishFlavors(@Param('menuId') menuId: string) {
    return this.reportsService.getAllDishFlavors(menuId);
  }

  @Get('/has-logo/:restaurantId')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Has logo report',
    operationId: 'hasLogoReport',
  })
  @ApiOkResponse({
    type: Boolean,
  })
  hasLogo(@Param('restaurantId') restaurantId: string) {
    return this.reportsService.hasLogo(restaurantId);
  }

  @Get('/has-active-category/:menuId')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Has active category report',
    operationId: 'hasActiveCategoryReport',
  })
  @ApiOkResponse({
    type: Boolean,
  })
  hasActiveCategory(@Param('menuId') menuId: string) {
    return this.reportsService.hasActiveCategory(menuId);
  }
}
