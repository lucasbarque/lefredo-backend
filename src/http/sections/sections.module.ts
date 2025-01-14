import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
  ],
  providers: [
    SectionsService,
    PrismaService
  ],
  controllers: [
    SectionsController
  ]
})
export class SectionsModule { }
