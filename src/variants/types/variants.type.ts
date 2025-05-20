import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum Size {
  NONE = 'None',
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  X_LARGE = 'X_LARGE',
  XX_LARGE = 'XXLARGE',
  S4YEARS_XS = '4YEARS_XS',
}

export enum TextColor {
  NONE = 'NONE',
  GREEN = 'GREEN',
  BLUE = 'BLUE',
  YELLOW = 'YELLOW',
  PINK = 'PINK',
  SKY_BLUE = 'Sky blue',
  BROWN = 'Brown',
  BLACK = 'BLACK',
  WHITE = 'WHITE',
  ORANGE = 'ORANGE',
  PURPLE = 'Purple',
}

registerEnumType(Size, {
  name: 'Size',
  description: 'Sizes shirts',
});

registerEnumType(TextColor, {
  name: 'TextColors',
  description: 'Colors Shirts',
});

@ObjectType()
export class Variants {
  @Field()
  id: string;

  @Field(() => Size)
  size: Size;

  @Field(() => TextColor)
  textColor: TextColor;

  @Field()
  rgb: string;

  @Field(() => Int)
  stock: number;
}
