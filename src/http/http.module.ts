import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MenusModule } from './menus/menus.module';
import { DishesModule } from './dishes/dishes.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { SectionsModule } from './sections/sections.module';
import { DishesExtrasModule } from './dishes-extras/dishes-extras.module';
import { DishesSpecsModule } from './dishes-specs/dishes-specs.module';
import { DishesFlavorsModule } from './dishes-flavors/dishes-flavors.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    UsersModule,
    MenusModule,
    DishesModule,
    DishesExtrasModule,
    DishesSpecsModule,
    DishesFlavorsModule,
    RestaurantsModule,
    SectionsModule,
  ],
  providers: [],
  controllers: [],
})
export class HttpModule {}
