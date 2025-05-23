import { Args, Query, Resolver } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Orders } from 'src/common/models/orders.model';
import { PaginationArgs } from 'src/common/args/pagination.args';

@Resolver()
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => [Orders], { name: 'Orders' })
  async getAllOrders(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Orders[]> {
    return await this.ordersService.getAllOrders(paginationArgs);
  }

  @Query(() => Orders, { name: 'Order' })
  async getOrderById(@Args('id') id: string): Promise<Orders | null> {
    return await this.ordersService.getOrdersById(id);
  }
}
