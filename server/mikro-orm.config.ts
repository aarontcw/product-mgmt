import { defineConfig } from '@mikro-orm/postgresql';
import { User } from './src/entities/user.entity';
import { Product } from './src/entities/product.entity';
import { Order } from './src/entities/order.entity';
import { OrderItem } from './src/entities/order-item.entity';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  entities: [User, Product, Order, OrderItem],
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  debug: process.env.NODE_ENV !== 'production',
  migrations: { path: 'migrations', glob: '!(*.d).{js,ts}' },
});