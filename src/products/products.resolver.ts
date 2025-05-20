import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Products } from './types/products.type';
import { Variants } from 'src/variants/types/variants.type';
import { VariantsService } from 'src/variants/variants.service';
import { ProductFilteArgs } from './args/product-filter.args';
import { CreateProductInput } from './inputs/create-product.input';

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
  getProducts(@Args() filterArgs: ProductFilteArgs) {
    return this.productsService.products(filterArgs);
  }

  @Mutation(() => Products, { name: 'newProduct' })
  createNewProduct(@Args('input') input: CreateProductInput) {
    return this.productsService.createProduct(input);
  }

  @ResolveField(() => [Variants])
  Variants(@Parent() product: Products) {
    return this.variantsService.getVariantsByProductId(product.id);
  }
}
