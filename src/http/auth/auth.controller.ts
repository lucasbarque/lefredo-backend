import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { AuthDTO } from './dto/auth.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('change-password')
  @ApiOperation({ summary: 'Change password', operationId: 'changePassword' })
  async changePassword(@Body() fields: ChangePasswordDTO) {
    return this.authService.changePassword(fields);
  }
}
