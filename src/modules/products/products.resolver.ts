import {
  Args,
  Context,
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
import { Logger, UseGuards } from '@nestjs/common';
import { IDataLoaders } from 'src/common/modules/dataloader/dataloader.interface';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { ROLES } from 'src/common/enums/roles.enum';

@Resolver(() => Products)
export class ProductsResolver {
  logger: Logger;
  constructor(
    private readonly productsService: ProductsService,
    private variantsService: VariantsService,
  ) {
    this.logger = new Logger();
  }

  @Query(() => Products, { name: 'product' })
  async getProductById(@Args('id') id: string) {
    return await this.productsService.product(id);
  }

  @Query(() => [Products], { name: 'products' })
  async getProducts(
    @Args() filterArgs: ProductFilteArgs,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.productsService.products(filterArgs, paginationArgs);
  }
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Products, { name: 'newProduct' })
  @Roles(ROLES.MANAGER)
  createNewProduct(@Args('input') input: ProductInput) {
    return this.productsService.createProduct(input);
  }
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Products, { name: 'updateProduct' })
  @Roles(ROLES.MANAGER)
  updateProduct(@Args('input') input: UpdateProductInput) {
    return this.productsService.updateProduct(input);
  }
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Products, { name: 'disableOrEnableProduct' })
  @Roles(ROLES.MANAGER)
  disableOrEnableProduct(@Args('input') input: ProductActiveInput) {
    return this.productsService.modifiedProductActiveField(input);
  }
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => String, { nullable: true, name: 'deleteProduct' })
  @Roles(ROLES.MANAGER)
  async deleteProduct(@Args('id') id: string) {
    await this.productsService.deleteProduct(id);
    return id;
  }

  @ResolveField(() => [Variants])
  async Variants(
    @Parent() product: Products,
    @Context() { loaders }: { loaders: IDataLoaders },
  ) {
    return loaders.variantsLoader.load(product.id);
  }
}
