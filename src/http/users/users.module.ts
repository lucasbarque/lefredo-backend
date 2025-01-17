import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
  ],
  providers: [
    UsersService,
    PrismaService
  ],
  controllers: [
    UsersController,
  ],
})
export class UsersModule { }
