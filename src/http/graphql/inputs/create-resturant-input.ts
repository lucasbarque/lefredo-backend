import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateResturantInput {
  @Field()
  name: string;

  @Field()
  userId: string;
}
