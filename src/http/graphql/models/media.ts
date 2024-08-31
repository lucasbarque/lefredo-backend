import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Media {
  @Field(() => String)
  title: string;

  @Field(() => String)
  url: string;
}
