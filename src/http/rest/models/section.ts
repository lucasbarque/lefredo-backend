import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Dish } from './dish';

@ObjectType()
export class Section {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => [Dish])
  dishes: Dish[];
}
