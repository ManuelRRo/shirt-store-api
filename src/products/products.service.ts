import { Injectable } from '@nestjs/common';
import { Products } from 'generated/prisma';
import { BrandsArgs } from 'src/brands/args/brands.args';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async products(): Promise<Products[]> {
    return this.prisma.products.findMany();
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
