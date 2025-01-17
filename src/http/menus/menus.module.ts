import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule
  ],
  providers: [
    // Services
    MenusService,
    PrismaService
  ],
  controllers: [
    MenusController
  ],
})
export class MenusModule { }
