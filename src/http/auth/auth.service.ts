import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma/prisma.service';

import { AuthDTO } from './dto/auth.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private primaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: AuthDTO): Promise<User | null> {
    const user = await this.primaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user || !password) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // async recoverPassword(email: string) {
  //   try {
  //     const user = await this.primaService.user.findFirst({
  //       where: {
  //         email,
  //       },
  //     });

  //     if (!user) {
  //       throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //     }

  //     const token = uuidv4();

  //     await this.mailService.sendPasswordRecovery(user, token);

  //     await this.primaService.user.update({
  //       where: {
  //         id: user.id,
  //       },
  //       data: {
  //         token,
  //         token_expiration: addHours(new Date(), 24),
  //       },
  //     });
  //   } catch (err) {
  //     throw new HttpException(
  //       'Error on send e-mail',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  async changePassword({ token, password }: ChangePasswordDTO) {
    const user = await this.primaService.user.findFirst({
      where: {
        token,
      },
    });

    if (!user) {
      throw new HttpException(
        'Password recover not found',
        HttpStatus.NOT_FOUND,
      );
    }

    if (user.tokenExpiration < new Date()) {
      throw new HttpException('Token expired', HttpStatus.NOT_ACCEPTABLE);
    }

    const saltRounds = 10;
    const password_salt = await bcrypt.genSalt(saltRounds);
    const password_hash = await bcrypt.hash(password, password_salt);

    await this.primaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: password_hash,
        token: null,
        tokenExpiration: null,
      },
    });
  }
}
