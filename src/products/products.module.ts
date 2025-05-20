import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { PrismaService } from 'src/prisma.service';
import { VariantsModule } from 'src/variants/variants.module';

@Module({
  imports: [VariantsModule],
  providers: [ProductsResolver, ProductsService, PrismaService],
  exports: [ProductsService],
})
export class ProductsModule {}
