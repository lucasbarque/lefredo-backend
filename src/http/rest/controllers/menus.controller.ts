import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateMenuInput } from 'src/http/rest/inputs/create-menu-input';
import { Menu } from 'src/http/rest/models/menu';

import { MenusService } from '@services/menus.service';
import { SectionsService } from '@services/sections.service';

@Resolver(() => Menu)
export class MenusResolver {
  constructor(
    private menusService: MenusService,
    private sectionsService: SectionsService,
  ) {}

  @Query(() => [Menu])
  getMenus(@Args('restaurantId') restaurantId: string) {
    return this.menusService.getMenusByRestaurantId(restaurantId);
  }

  @Query(() => Menu)
  getMenuById(@Args('menuId') menuId: string) {
    return this.menusService.getMenuById(menuId);
  }

  @Mutation(() => Menu)
  createMenu(@Args('data') data: CreateMenuInput) {
    return this.menusService.createMenu(data);
  }

  @ResolveField()
  sections(@Parent() menu: Menu) {
    return this.sectionsService.getSectionsByMenuId(menu.id);
  }
}
