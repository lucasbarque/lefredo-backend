import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';

import { DishesService } from '@services/dishes.service';
import { MenusService } from '@services/menus.service';
import { RestaurantsService } from '@services/restaurants.service';
import { SectionsService } from '@services/sections.service';
import { UsersService } from '@services/users.service';

import { DatabaseModule } from '../database/database.module';
import { jwtConstants } from './auth/auth.constants';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { MediasService } from './rest/medias/medias.service';
import { UsersController } from '@controllers/users.controller';
import { RestaurantsController } from '@controllers/restaurants.controller';
import { MenusController } from '@controllers/menus.controller';
import { SectionsController } from '@controllers/sections.controller';
import { DishesController } from '@controllers/dishes.controller';
import { MediasController } from './rest/medias/medias.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    MulterModule.register({
      dest: './files',
    }),
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: jwtConstants.expiresIn,
      },
    }),
  ],
  providers: [
    // Services
    UsersService,
    RestaurantsService,
    MenusService,
    SectionsService,
    DishesService,
    MediasService,
    AuthService,
  ],
  controllers: [
    MediasController,
    UsersController,
    RestaurantsController,
    MenusController,
    SectionsController,
    DishesController,
  ],
})
export class HttpModule {}
