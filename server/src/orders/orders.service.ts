import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(private em: EntityManager) {}

  async create(userId: string, items: { productId: string; quantity: number }[]) {
    if (!items?.length) throw new BadRequestException('Empty cart');
    const order = this.em.create(Order, { 
      userId, 
      status: 'PENDING', 
      totalCents: 0, 
      items: [],          // ✅ add this
      createdAt: new Date() // ✅ add this
    });
    let total = 0;

    for (const it of items) {
      const p = await this.em.findOne(Product, { id: it.productId });
      if (!p || !p.isActive) throw new BadRequestException('Invalid product');
      if (p.stock < it.quantity) throw new BadRequestException('Insufficient stock');
      p.stock -= it.quantity;
      const oi = this.em.create(OrderItem, {
        order, product: p, quantity: it.quantity, unitPriceCents: p.priceCents
      });
      order.items.push(oi);
      total += p.priceCents * it.quantity;
    }
    order.totalCents = total;
    await this.em.persistAndFlush(order);
    return order;
  }
}