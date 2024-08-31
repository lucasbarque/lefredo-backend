import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMenuInput {
  @Field()
  title: string;

  @Field()
  restaurantId: string;
}
