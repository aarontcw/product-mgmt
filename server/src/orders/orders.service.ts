import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from '../entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orders: EntityRepository<Order>,
    @InjectRepository(OrderItem) private items: EntityRepository<OrderItem>,
    @InjectRepository(Product) private products: EntityRepository<Product>,
  ) {}

  async create(userId: string, dto: CreateOrderDto) {
    const em = this.orders.getEntityManager();
    const order = this.orders.create({ user: userId, status: 'PENDING', totalCents: 0 });
    await em.persist(order);

    let total = 0;
    for (const input of dto.items) {
      const product = await this.products.findOne({ id: input.productId, isActive: true });
      if (!product) throw new BadRequestException('Invalid product');
      if (product.stock < input.quantity) throw new BadRequestException('Insufficient stock');
      const line = this.items.create({
        order, product, quantity: input.quantity, unitPriceCents: product.priceCents,
      });
      await em.persist(line);
      product.stock -= input.quantity;
      total += input.quantity * product.priceCents;
    }
    order.totalCents = total;
    order.status = 'PAID'; // simulated success
    await em.flush();
    return order;
  }

  listMine(userId: string) {
    return this.orders.find({ user: userId }, { populate: ['items', 'items.product'], orderBy: { createdAt: 'DESC' } });
  }

  listAll() {
    return this.orders.findAll({ populate: ['user', 'items', 'items.product'], orderBy: { createdAt: 'DESC' } });
  }
}