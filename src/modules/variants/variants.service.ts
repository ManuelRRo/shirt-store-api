import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VariantsService {
  constructor(private prisma: PrismaService) {}

  async getVariantsByProductId(productId: string) {
    return this.prisma.variants.findMany({
      where: {
        product_id: productId,
      },
    });
  }
}
