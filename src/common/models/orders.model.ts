import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Orders {
  @Field()
  id: string;

  @Field()
  user_id: string;

  @Field()
  stripe_checkout_id: string;

  @Field(() => Date)
  created_at: Date;
}
