import { ArgsType, Field } from '@nestjs/graphql';
import { Size, TextColor } from 'src/variants/types/variants.type';

@ArgsType()
export class ProductFilteArgs {
  @Field({ nullable: true })
  brand_id?: string;

  @Field({ nullable: true })
  categoryId?: string;

  @Field(() => Size, { nullable: true })
  size?: Size;

  @Field(() => TextColor, { nullable: true })
  textColor?: TextColor;
}
