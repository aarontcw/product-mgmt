import { Entity, ManyToOne, OneToMany, Property, Collection } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { OrderItem } from './order-item.entity';
export type OrderStatus = 'PENDING'|'PAID'|'CANCELLED';

@Entity({ tableName: 'order' })
export class Order extends BaseEntity {
  @ManyToOne(() => User) user!: User;
  @Property() status: OrderStatus = 'PENDING';
  @Property() totalCents: number = 0;
  @OneToMany(() => OrderItem, oi => oi.order) items = new Collection<OrderItem>(this);
}