import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthDTO } from './dto/auth.dto';
import { RestAuthGuard } from './guards/rest-jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() fields: AuthDTO) {
    return this.authService.signIn(fields);
  }

  @UseGuards(RestAuthGuard)
  @Get('me')
  async me(@Headers('Authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is required');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    return this.authService.me(token);
  }

  // @Post('auth/recover-password')
  // async recoverPassword(@Body() fields) {
  //   return this.authService.recoverPassword(fields.email);
  // }

  @Post('change-password')
  async changePassword(@Body() fields: ChangePasswordDTO) {
    return this.authService.changePassword(fields);
  }
}
