import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Module({
  providers: [
    OrdersResolver,
    OrdersService,
    PrismaService,
    JwtService,
    UsersService,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
