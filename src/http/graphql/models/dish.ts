import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Media } from './media';
import { Section } from './section';

@ObjectType()
export class Dish {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field(() => [Media])
  images: Media[];

  @Field(() => Section)
  section: Section;
  sectionId: string;
}
