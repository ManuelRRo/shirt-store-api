import { Injectable } from '@nestjs/common';
import { Orders } from 'generated/prisma';
import { PaginationArgs } from 'src/common/args/pagination.args';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllOrders(paginationArgs: PaginationArgs): Promise<Orders[]> {
    const { offset, limit } = paginationArgs;
    return await this.prisma.orders.findMany({
      skip: offset,
      take: limit,
    });
  }

  async getOrdersById(id: string): Promise<Orders | null> {
    return await this.prisma.orders.findFirst({
      where: { id },
    });
  }
}
