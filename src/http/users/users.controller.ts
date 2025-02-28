import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDTO } from './create-user.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ClerkAuthGuard } from '../auth/guards/clerk-auth.guard';
import { GetUserByRestaurantId } from './dto/get-user-by-restaurant.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/restaurant/:restaurantId')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Get user by restaurantId',
    operationId: 'getUserByRestaurantId',
  })
  @ApiOkResponse({
    type: GetUserByRestaurantId,
  })
  getUserByRestaurantId(@Param('restaurantId') restaurantId: string) {
    return this.usersService.getByRestaurantId(restaurantId);
  }

  @Patch('/change-onboarding-status/:id')
  // @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Change onboarding status',
    operationId: 'changeOnboardingStatus',
  })
  @ApiOkResponse()
  changeOnboardingStatus(@Param('id') id: string) {
    return this.usersService.changeOnboardingStatus(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users', operationId: 'getAllUsers' })
  list() {
    return this.usersService.list();
  }

  @Post()
  @ApiOperation({ summary: 'Create user', operationId: 'createUser' })
  create(@Body() data: CreateUserDTO) {
    return this.usersService.create(data);
  }
}
