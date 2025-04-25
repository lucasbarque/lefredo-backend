import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { DishesExtrasController } from './dishes-extras.controller';
import { DishesExtrasService } from './dishes-extras.service';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  providers: [DishesExtrasService, PrismaService],
  controllers: [DishesExtrasController],
})
export class DishesExtrasModule {}
