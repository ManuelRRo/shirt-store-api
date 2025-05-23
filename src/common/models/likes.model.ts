import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Likes {
  @Field()
  product_id: string;

  @Field()
  user_id: string;
}
