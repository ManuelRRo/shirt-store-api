import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsResolver } from './brands.resolver';
import { PrismaService } from 'src/prisma.service';
import { ProductsModule } from 'src/modules/products/products.module';

@Module({
  imports: [ProductsModule],
  providers: [BrandsResolver, BrandsService, PrismaService],
})
export class BrandsModule {}
