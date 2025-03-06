import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { DishesFlavorsController } from './dishes-flavors.controller';
import { DishesFlavorsService } from './dishes-flavors.service';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  providers: [DishesFlavorsService, PrismaService],
  controllers: [DishesFlavorsController],
})
export class DishesFlavorsModule {}
