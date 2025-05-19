import { Injectable } from '@nestjs/common';
import { Brands } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async brands(offset: number, limit: number): Promise<Brands[]> {
    return this.prisma.brands.findMany({
      skip: offset,
      take: limit,
    });
  }

  async getBrandById(brandId: string) {
    return this.prisma.brands.findFirst({
      where: {
        id: brandId,
      },
    });
  }
}
