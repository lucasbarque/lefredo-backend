import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @Post('auth/recover-password')
  // async recoverPassword(@Body() fields) {
  //   return this.authService.recoverPassword(fields.email);
  // }

  @Post('auth/change-password')
  async changePassword(@Body() fields: ChangePasswordDTO) {
    return this.authService.changePassword(fields);
  }
}
