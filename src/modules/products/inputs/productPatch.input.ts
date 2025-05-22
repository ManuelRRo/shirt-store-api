import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class PatchProductInput {
  @Field()
  brand_id: string;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field()
  categoryId: string;
}
