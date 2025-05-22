import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  Mutation,
} from '@nestjs/graphql';
import { BrandsService } from './brands.service';
import { ProductsService } from 'src/modules/products/products.service';
import { CreateBrandInput } from './input/create-brand.input';
import { Products } from 'src/common/models/products.model';
import { Brand } from 'src/common/models/brand.model';
import { PaginationArgs } from 'src/common/args/pagination.args';

@Resolver(() => Brand)
export class BrandsResolver {
  constructor(
    private readonly brandsService: BrandsService,
    private productsService: ProductsService,
  ) {}

  @Query(() => [Brand], { name: 'brands' })
  getBrands(@Args() args: PaginationArgs) {
    return this.brandsService.brands(args);
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
  products(@Parent() brand: Brand, @Args() args: PaginationArgs) {
    return this.productsService.getProductsByBrandId(brand.id, args);
  }
}
