import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private em: EntityManager) {}

  listPublic() {
    return this.em.find(Product, { isActive: true }, { orderBy: { createdAt: 'desc' } });
  }
  listAll() {
    return this.em.find(Product, {}, { orderBy: { createdAt: 'desc' } });
  }
  async get(id: string) {
    const p = await this.em.findOne(Product, { id });
    if (!p) throw new NotFoundException();
    return p;
  }
  async create(data: Partial<Product>) {
    const p = this.em.create(Product, data as any); 
    await this.em.persistAndFlush(p);
    return p;
  }
  async update(id: string, data: Partial<Product>) {
    const p = await this.get(id);
    Object.assign(p, data);
    await this.em.flush();
    return p;
  }
  async remove(id: string) {
    const p = await this.get(id);
    await this.em.removeAndFlush(p);
    return true;
  }
}