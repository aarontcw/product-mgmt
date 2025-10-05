import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity()
export class User {
  @PrimaryKey()
  id: string = uuidv4();

  @Property({ unique: true })
  email!: string;

  @Property()
  passwordHash!: string;

  @Property({ default: UserRole.USER })
  role: UserRole = UserRole.USER;

  @Property({ onCreate: () => new Date(), nullable: true })
createdAt: Date = new Date();
}