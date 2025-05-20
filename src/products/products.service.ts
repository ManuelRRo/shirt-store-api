import { Injectable } from '@nestjs/common';
import { Products } from 'generated/prisma';
import { BrandsArgs } from 'src/brands/args/brands.args';
import { PrismaService } from 'src/prisma.service';
import { ProductFilteArgs } from './args/product-filter.args';
import { CreateProductInput } from './inputs/create-product.input';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async products(filters: ProductFilteArgs): Promise<Products[]> {
    return this.prisma.products.findMany({
      where: {
        productCategories: {
          some: {
            categoryId: filters.categoryId,
          },
        },
      },
    });
  }
  async product(productId: string) {
    return this.prisma.products.findFirst({
      where: {
        id: productId,
      },
    });
  }
  // async products(filters: ProductFilteArgs): Promise<Products[]> {
  //   return this.prisma.products.findMany({
  //     where: {
  //       brand_id: filters.brand_id,
  //       variants: {
  //         some: { size: filters.size, textColor: filters.textColor },
  //       },
  //       productCategories: {
  //         some: {
  //           categoryId: filters.categoryId,
  //           categories: { parentId: filters.parentCategory },
  //         },
  //       },
  //     },
  //   });
  // }
  async getProductsByBrandId(brandId: string, args: BrandsArgs) {
    return this.prisma.products.findMany({
      skip: args.offset,
      take: args.limit,
      where: {
        brand_id: brandId,
      },
    });
  }

  async createProduct(input: CreateProductInput) {
    return this.prisma.products.create({
      data: {
        brand_id: input.brand_id,
        name: input.name,
        price: input.price,
        productCategories: {
          create: {
            categoryId: input.categoryId,
          },
        },
      },
      include: {
        productCategories: {
          include: {
            categories: true,
          },
        },
        brand: true,
      },
    });
  }
}
