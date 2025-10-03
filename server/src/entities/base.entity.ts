import { PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';

export abstract class BaseEntity {
  @PrimaryKey()
  id: string = uuid();

  @Property({ onCreate: () => new Date() })
  createdAt?: Date;

  @Property({ onUpdate: () => new Date(), nullable: true })
  updatedAt?: Date;
}