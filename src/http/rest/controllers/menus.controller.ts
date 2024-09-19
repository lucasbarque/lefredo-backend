// import { CreateMenuInput } from 'src/http/rest/dto/create-menu-input';

import { MenusService } from '@services/menus.service';
import { SectionsService } from '@services/sections.service';

export class MenusResolver {
  constructor(
    private menusService: MenusService,
    private sectionsService: SectionsService,
  ) {}

  // getMenus(@Args('restaurantId') restaurantId: string) {
  //   return this.menusService.getMenusByRestaurantId(restaurantId);
  // }

  // getMenuById(@Args('menuId') menuId: string) {
  //   return this.menusService.getMenuById(menuId);
  // }

  // createMenu(@Args('data') data: CreateMenuInput) {
  //   return this.menusService.createMenu(data);
  // }

  // sections(@Parent() menu: Menu) {
  //   return this.sectionsService.getSectionsByMenuId(menu.id);
  // }
}
