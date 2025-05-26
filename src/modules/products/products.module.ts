import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { PrismaService } from 'src/prisma.service';
import { VariantsModule } from 'src/modules/variants/variants.module';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Module({
  imports: [VariantsModule],
  providers: [
    ProductsResolver,
    ProductsService,
    PrismaService,
    JwtService,
    UsersService,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
