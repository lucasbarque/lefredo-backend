import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule
  ],
  providers: [
    DishesService,
    PrismaService
  ],
  controllers: [
    DishesController
  ],
})
export class DishesModule { }
