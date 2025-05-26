import { Resolver } from '@nestjs/graphql';
import { Cart } from 'src/common/models/cart.model';

@Resolver(() => Cart)
export class CartsResolver {}
