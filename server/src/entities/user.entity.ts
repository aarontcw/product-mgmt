import { Entity, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
export type UserRole = 'ADMIN'|'CUSTOMER';

@Entity({ tableName: 'user' })
export class User extends BaseEntity {
  @Property() @Unique() email!: string;
  @Property() passwordHash!: string;
  @Property({ type: 'string' }) role: UserRole = 'CUSTOMER';
}