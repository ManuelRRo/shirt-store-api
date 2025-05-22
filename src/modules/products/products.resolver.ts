import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProductsService } from './products.service';

import { VariantsService } from 'src/modules/variants/variants.service';
import { ProductFilteArgs } from './args/product-filter.args';
import { ProductInput } from './inputs/create-product.input';
import { Products } from 'src/common/models/products.model';
import { Variants } from 'src/common/models/variants.model';
import { PaginationArgs } from 'src/common/args/pagination.args';
import { ProductActiveInput } from './inputs/changeActiveProduct.input';
import { UpdateProductInput } from './inputs/updateProduct.input';

@Resolver(() => Products)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private variantsService: VariantsService,
  ) {}

  @Query(() => Products, { name: 'product' })
  async getProductById(@Args('id') id: string) {
    return await this.productsService.product(id);
  }

  @Query(() => [Products], { name: 'products' })
  getProducts(
    @Args() filterArgs: ProductFilteArgs,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.productsService.products(filterArgs, paginationArgs);
  }

  @Mutation(() => Products, { name: 'newProduct' })
  createNewProduct(@Args('input') input: ProductInput) {
    return this.productsService.createProduct(input);
  }

  @Mutation(() => Products, { name: 'updateProduct' })
  updateProduct(@Args('input') input: UpdateProductInput) {
    return this.productsService.updateProduct(input);
  }

  @Mutation(() => Products, { name: 'disableOrEnableProduct' })
  disableOrEnableProduct(@Args('input') input: ProductActiveInput) {
    return this.productsService.modifiedProductActiveField(input);
  }

  @Mutation(() => String, { nullable: true, name: 'deleteProduct' })
  async deleteProduct(@Args('id') id: string) {
    await this.productsService.deleteProduct(id);
    return id;
  }

  @ResolveField(() => [Variants])
  Variants(@Parent() product: Products) {
    return this.variantsService.getVariantsByProductId(product.id);
  }
}
