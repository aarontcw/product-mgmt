import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private svc: OrdersService) {}

  @Post() create(@Req() req: any, @Body() dto: CreateOrderDto) { return this.svc.create(req.user.userId, dto); }
  @Get('me') mine(@Req() req: any) { return this.svc.listMine(req.user.userId); }

  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Get('all') all() { return this.svc.listAll(); }
}