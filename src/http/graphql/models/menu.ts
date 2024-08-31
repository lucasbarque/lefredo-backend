import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Section } from './section';

@ObjectType()
export class Menu {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => [Section])
  sections: Section[];
}
