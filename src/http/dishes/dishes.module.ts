import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';
import { S3Service } from '../medias/s3.service';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  providers: [DishesService, PrismaService, S3Service],
  controllers: [DishesController],
})
export class DishesModule {}
