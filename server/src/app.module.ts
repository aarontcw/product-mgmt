import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql'; // ✅ add this

import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        driver: PostgreSqlDriver, // ✅ required for MikroORM v6+
        entities: [User, Product, Order, OrderItem],
        dbName: cfg.get<string>('DB_NAME'),
        user: cfg.get<string>('DB_USER'),
        password: cfg.get<string>('DB_PASS'),
        host: cfg.get<string>('DB_HOST'),
        port: cfg.get<number>('DB_PORT') ?? 5432,
        debug: process.env.NODE_ENV !== 'production',
      }),
    }),
    MikroOrmModule.forFeature([User, Product, Order, OrderItem]),
    AuthModule,
    ProductsModule,
    OrdersModule,
  ],
})
export class AppModule {}
