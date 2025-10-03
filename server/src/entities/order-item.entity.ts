import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity()
export class OrderItem extends BaseEntity {
  @ManyToOne(() => Order) order!: Order;
  @ManyToOne(() => Product) product!: Product;
  @Property() quantity!: number;
  @Property() unitPriceCents!: number;
}