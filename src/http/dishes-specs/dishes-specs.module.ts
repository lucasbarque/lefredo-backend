import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { DishesSpecsController } from './dishes-specs.controller';
import { DishesSpecsService } from './dishes-specs.service';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  providers: [DishesSpecsService, PrismaService],
  controllers: [DishesSpecsController],
})
export class DishesSpecsModule {}
