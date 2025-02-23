import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDTO } from './create-user.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

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
