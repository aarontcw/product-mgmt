import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';

@Entity()
export class Product extends BaseEntity {
  @Property() name!: string;
  @Property({ nullable: true, type: 'text' }) description?: string;
  @Property() priceCents!: number;
  @Property() stock: number = 0;
  @Property({ nullable: true }) imageUrl?: string;
  @Property() isActive: boolean = true;
}