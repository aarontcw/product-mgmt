import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private svc: OrdersService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: any, @Body() body: { items: { productId: string; quantity: number }[] }) {
    return this.svc.create(req.user.sub, body.items);
  }
}