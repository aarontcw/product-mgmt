import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private svc: ProductsService) {}

  // Public
  @Get() list() { return this.svc.listPublic(); }
  @Get(':id') find(@Param('id') id: string) { return this.svc.findOne(id); }

  // Admin
  @ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN')
  @Get('admin/all') listAdmin() { return this.svc.listAdmin(); }

  @ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN')
  @Post() create(@Body() dto: CreateProductDto) { return this.svc.create(dto); }

  @ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN')
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateProductDto) { return this.svc.update(id, dto); }

  @ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN')
  @Delete(':id') remove(@Param('id') id: string) { return this.svc.remove(id); }
}