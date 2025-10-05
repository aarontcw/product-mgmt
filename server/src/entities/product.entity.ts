import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Product {
  @PrimaryKey()
  id: string = uuidv4();

  @Property()
  name: string = '';

  @Property({ nullable: true })
  description?: string;

  @Property()
  priceCents: number = 0;

  @Property()
  stock: number = 0;

  @Property({ default: true })
  isActive: boolean = true;

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();
}