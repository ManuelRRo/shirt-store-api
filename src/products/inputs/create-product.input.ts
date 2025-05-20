import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  brandId: string;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;
}
