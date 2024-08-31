import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSectionInput {
  @Field()
  title: string;

  @Field()
  menuId: string;
}
