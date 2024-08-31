import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'node:path';

import { DishesResolver } from '@resolvers/dishes.resolver';
import { MenusResolver } from '@resolvers/menus.resolver';
import { RestaurantsResolver } from '@resolvers/restaurants.resolver';
import { SectionsResolver } from '@resolvers/sections.resolver';
import { UsersResolver } from '@resolvers/users.resolver';

import { DishesService } from '@services/dishes.service';
import { MenusService } from '@services/menus.service';
import { RestaurantsService } from '@services/restaurants.service';
import { SectionsService } from '@services/sections.service';
import { UsersService } from '@services/users.service';

import { DatabaseModule } from '../database/database.module';
import { jwtConstants } from './auth/auth.constants';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { MediasController } from './rest/medias/medias.controller';
import { MediasService } from './rest/medias/medias.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
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
    // Resolvers
    UsersResolver,
    RestaurantsResolver,
    MenusResolver,
    SectionsResolver,
    DishesResolver,

    // Services
    UsersService,
    RestaurantsService,
    MenusService,
    SectionsService,
    DishesService,
    MediasService,
    AuthService,

    // Controllers
    MediasController,
  ],
  controllers: [MediasController],
})
export class HttpModule {}
