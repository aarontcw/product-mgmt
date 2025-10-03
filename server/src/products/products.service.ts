import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: EntityRepository<Product>) {}

  listPublic() { return this.repo.find({ isActive: true }, { orderBy: { createdAt: 'DESC' } }); }
  listAdmin()  { return this.repo.findAll({ orderBy: { createdAt: 'DESC' } }); }
  findOne(id: string) { return this.repo.findOne({ id }).then(p => p ?? Promise.reject(new NotFoundException())); }
  async create(dto: CreateProductDto) {
    const p = this.repo.create({
      ...dto,
      isActive: dto.isActive ?? true,   // 👈 ensures it's always boolean
    });
    await this.repo.getEntityManager().persistAndFlush(p);
    return p;
  }
  async update(id: string, dto: UpdateProductDto) { const p = await this.findOne(id); this.repo.assign(p, dto); await this.repo.getEntityManager().flush(); return p; }
  async remove(id: string) { const p = await this.findOne(id); await this.repo.getEntityManager().removeAndFlush(p); return { ok:true }; }
}