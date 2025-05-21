import { Injectable } from '@nestjs/common';
import { Products } from 'generated/prisma';
import { BrandsArgs } from 'src/brands/args/brands.args';
import { PrismaService } from 'src/prisma.service';
import { ProductFilteArgs } from './args/product-filter.args';
import { ProductInput } from './inputs/create-product.input';
import { Size, TextColor } from 'src/variants/types/variants.type';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async products(
    filters: ProductFilteArgs,
    offset: number,
    limit: number,
  ): Promise<Products[]> {
    return await this.prisma.products.findMany({
      skip: offset,
      take: limit,
      where: {
        AND: [
          // Filter by brand if provided
          filters.brand_id ? { brand_id: filters.brand_id } : {},

          // Filter by variants if provided
          filters.size || filters.textColor
            ? {
                variants: {
                  some: {
                    AND: [
                      filters.size && filters.size !== Size.NONE
                        ? { size: filters.size }
                        : {},
                      filters.textColor && filters.textColor !== TextColor.NONE
                        ? { textColor: filters.textColor }
                        : {},
                    ].filter((condition) => Object.keys(condition).length > 0),
                  },
                },
              }
            : {},

          // Filter by category if provided
          filters.categoryId || filters.parentCategory
            ? {
                productCategories: {
                  some: {
                    AND: [
                      filters.categoryId
                        ? { categoryId: filters.categoryId }
                        : {},
                      filters.parentCategory
                        ? { categories: { parentId: filters.parentCategory } }
                        : {},
                    ].filter((condition) => Object.keys(condition).length > 0),
                  },
                },
              }
            : {},
        ].filter((condition) => Object.keys(condition).length > 0),
      },
      include: {
        brand: true,
        variants: true,
        productCategories: {
          include: {
            categories: true,
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

  async createProduct(input: ProductInput) {
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

  async updateProduct(input: ProductInput, id: string) {
    return this.prisma.products.update({
      where: {
        id,
      },
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
