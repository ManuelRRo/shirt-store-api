import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Brand } from './brand.model';

@ObjectType()
export class Products {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => Brand)
  brand: Brand;
}
