import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Int,
  Resolver,
} from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Products } from './types/products.type';
import { Variants } from 'src/variants/types/variants.type';
import { VariantsService } from 'src/variants/variants.service';
import { ProductFilteArgs } from './args/product-filter.args';
import { ProductInput } from './inputs/create-product.input';

@Resolver(() => Products)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private variantsService: VariantsService,
  ) {}

  @Query(() => Products, { name: 'product' })
  getProductById(@Args('id') id: string) {
    return this.productsService.product(id);
  }

  @Query(() => [Products], { name: 'products' })
  getProducts(
    @Args() filterArgs: ProductFilteArgs,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('limit', { type: () => Int }) limit: number,
  ) {
    return this.productsService.products(filterArgs, offset, limit);
  }

  @Mutation(() => Products, { name: 'newProduct' })
  createNewProduct(@Args('input') input: ProductInput) {
    return this.productsService.createProduct(input);
  }

  @Mutation(() => Products, { name: 'updateProduct' })
  updateProduct(@Args('input') input: ProductInput, @Args('id') id: string) {
    return this.productsService.updateProduct(input, id);
  }

  @ResolveField(() => [Variants])
  Variants(@Parent() product: Products) {
    return this.variantsService.getVariantsByProductId(product.id);
  }
}
