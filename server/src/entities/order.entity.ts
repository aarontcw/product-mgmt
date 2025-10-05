import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryKey()
  id: string = uuidv4();

  @Property()
  userId!: string;

  @Property({ default: 'PENDING' })
  status: 'PENDING' | 'PAID' | 'CANCELLED' = 'PENDING';

  @Property({ default: 0 })
  totalCents: number = 0;

  @OneToMany(() => OrderItem, oi => oi.order)
  items: OrderItem[] = [];

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();
}