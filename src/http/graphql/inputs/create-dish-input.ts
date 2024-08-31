import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDishInput {
  @Field()
  title: string;

  @Field()
  description?: string;

  @Field()
  price: number;

  @Field()
  sectionId: string;
}
