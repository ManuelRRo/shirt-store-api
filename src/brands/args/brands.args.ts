import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class BrandsArgs {
  @Field(() => Int)
  offset: number;

  @Field(() => Int)
  limit: number;
}
