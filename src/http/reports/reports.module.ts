import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  providers: [ReportsService, PrismaService],
  controllers: [ReportsController],
})
export class ReportsModule {}
