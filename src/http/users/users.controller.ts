import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDTO } from './create-user.dto';
import { RestAuthGuard } from 'src/http/auth/guards/rest-jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get()
  @UseGuards(RestAuthGuard)
  list() {
    return this.usersService.list();
  }

  @Post()
  create(@Body() data: CreateUserDTO) {
    return this.usersService.create(data);
  }
}
