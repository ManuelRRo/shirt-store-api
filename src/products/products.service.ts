import { Injectable } from '@nestjs/common';
import { Products } from 'generated/prisma';
import { BrandsArgs } from 'src/brands/args/brands.args';
import { PrismaService } from 'src/prisma.service';
import { ProductFilteArgs } from './args/product-filter.args';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // async products(): Promise<Products[]> {
  //   return this.prisma.products.findMany();
  // }
  async products(filters: ProductFilteArgs): Promise<Products[]> {
    const { brand_id } = filters;
    return this.prisma.products.findMany({
      where: {
        ...(brand_id && { brand_id }),
        productCategories: {
          some: {
            categoryId: filters.categoryId,
          },
        },
        variants: {
          some: { size: filters.size, textColor: filters.textColor },
        },
      },
      include: {
        brand: true,
        variants: true,
        likes: true,
        productCategories: true,
      },
    });
  }
  async getProductsByBrandId(brandId: string, args: BrandsArgs) {
    return this.prisma.products.findMany({
      skip: args.offset,
      take: args.limit,
      where: {
        brand_id: brandId,
      },
    });
  }
}
