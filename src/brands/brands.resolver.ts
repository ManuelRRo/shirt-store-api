import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  Int,
  Mutation,
} from '@nestjs/graphql';
import { BrandsService } from './brands.service';
import { Brand } from './types/brand.type';
import { Products } from 'src/products/types/products.type';
import { ProductsService } from 'src/products/products.service';
import { BrandsArgs } from './args/brands.args';
import { CreateBrandInput } from './input/create-brand.input';

@Resolver(() => Brand)
export class BrandsResolver {
  constructor(
    private readonly brandsService: BrandsService,
    private productsService: ProductsService,
  ) {}

  @Query(() => [Brand], { name: 'brands' })
  getBrands(
    @Args('offset', { type: () => Int }) offset: number,
    @Args('limit', { type: () => Int }) limit: number,
  ) {
    return this.brandsService.brands(offset, limit);
  }

  @Query(() => Brand, { name: 'brand' })
  async getBrandById(@Args('id') id: string) {
    return this.brandsService.getBrandById(id);
  }

  @Mutation(() => Brand, { name: 'newBrand' })
  createBrand(@Args('input') input: CreateBrandInput) {
    return this.brandsService.createBrand(input);
  }

  @ResolveField(() => [Products])
  products(@Parent() brand: Brand, @Args() args: BrandsArgs) {
    return this.productsService.getProductsByBrandId(brand.id, args);
  }
}
