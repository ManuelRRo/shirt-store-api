import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Products } from './types/products.type';
import { Variants } from 'src/variants/types/variants.type';
import { VariantsService } from 'src/variants/variants.service';
import { ProductFilteArgs } from './args/product-filter.args';

@Resolver(() => Products)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private variantsService: VariantsService,
  ) {}

  // @Query(() => [Products], { name: 'products' })
  // getProducts() {
  //   return this.productsService.products();
  // }

  @Query(() => [Products], { name: 'products' })
  getProducts(@Args() filterArgs: ProductFilteArgs) {
    return this.productsService.products(filterArgs);
  }

  @ResolveField(() => [Variants])
  Variants(@Parent() product: Products) {
    return this.variantsService.getVariantsByProductId(product.id);
  }
}
