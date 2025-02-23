import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RestaurantsService } from './restaurants.service';
import { AuthModule } from '../auth/auth.module';
import { RestaurantsController } from './restaurants.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { R2Service } from '../medias/r2.service';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  providers: [RestaurantsService, PrismaService, R2Service],
  controllers: [RestaurantsController],
})
export class RestaurantsModule {}
