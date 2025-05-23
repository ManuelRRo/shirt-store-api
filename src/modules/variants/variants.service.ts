import { Injectable, Logger } from '@nestjs/common';
import { Variants } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VariantsService {
  logger: Logger;
  constructor(private prisma: PrismaService) {
    this.logger = new Logger();
  }

  async getVariantsByProductId(productId: string) {
    return this.prisma.variants.findMany({
      where: {
        product_id: productId,
      },
    });
  }

  async getVariantsByProductIdLoader(
    productIds: string[],
  ): Promise<Variants[]> {
    return this.prisma.variants.findMany({
      where: {
        product: {
          id: {
            in: productIds,
          },
        },
      },
    });
  }

  async getVariantsProductsByBatch(
    productIds: string[],
  ): Promise<Variants[][]> {
    const variants = await this.getVariantsByProductIdLoader(productIds);
    //this.logger.debug(variants);
    const mappedResults = this._mapResultToIds(productIds, variants);
    this.logger.debug(variants, 'Vaiatnstad OUput');
    return mappedResults;
  }

  _mapResultToIds(productIds: string[], variants: Variants[]): Variants[][] {
    return productIds.map(
      (id) =>
        variants.filter((variant: Variants) => variant.product_id === id) ||
        null,
    );
  }
}
