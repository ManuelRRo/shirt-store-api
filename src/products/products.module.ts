import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ProductsResolver, ProductsService, PrismaService],
  exports: [ProductsService],
})
export class ProductsModule {}
