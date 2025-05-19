import { Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Products } from './types/products.type';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Products], { name: 'products' })
  getProducts() {
    return this.productsService.products();
  }
}
