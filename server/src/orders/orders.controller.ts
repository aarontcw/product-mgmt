import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Product } from '../entities/product.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly em: EntityManager) {}

  @Post('checkout')
  async checkout(@Body() body: { items: { productId: string; quantity: number }[] }) {
    if (!body.items?.length) throw new BadRequestException('No items provided');

    for (const item of body.items) {
      const product = await this.em.findOne(Product, { id: item.productId });
      if (!product) throw new BadRequestException(`Product ${item.productId} not found`);
      if (product.stock < item.quantity)
        throw new BadRequestException(`Not enough stock for ${product.name}`);

      product.stock -= item.quantity; // ✅ deduct stock
      if (product.stock <= 0) product.isActive = false; // ✅ auto-delist
    }

    await this.em.flush();
    return { message: 'Checkout complete. Stock updated successfully.' };
  }
}