import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Menu } from './menu';

@ObjectType()
export class Restaurant {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [Menu])
  menus: Menu[];
}
