import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { DishesService } from '@services/dishes.service';
import { SectionsService } from '@services/sections.service';

import { Section } from '@models/section';

import { CreateSectionInput } from '@inputs/create-section-input';

@Resolver(() => Section)
export class SectionsResolver {
  constructor(
    private sectionsService: SectionsService,
    private dishesService: DishesService,
  ) {}

  @Query(() => [Section])
  getSections(@Args('menuId') menuId: string) {
    return this.sectionsService.getSectionsByMenuId(menuId);
  }

  @Mutation(() => Section)
  createSection(@Args('data') data: CreateSectionInput) {
    return this.sectionsService.createSection(data);
  }

  @ResolveField()
  dishes(@Parent() section: Section) {
    return this.dishesService.getDishesBySectionId(section.id);
  }
}
