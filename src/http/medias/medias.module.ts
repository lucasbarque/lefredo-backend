import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { MediasService } from './medias.service';
import { MediasController } from './medias.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { R2Service } from './r2.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({
      dest: './files',
    }),
    AuthModule
  ],
  providers: [
    // Services
    MediasService,
    PrismaService,
    R2Service
  ],
  controllers: [
    MediasController
  ]
})
export class MediasModule { }
