import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import config from '../mikro-orm.config';
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import * as bcrypt from 'bcrypt';

(async () => {
  const orm = await MikroORM.init(config);
  const em = orm.em.fork();

  const now = new Date();

  const admin = em.create(User, {
    email: 'admin@example.com',
    passwordHash: await bcrypt.hash('Admin123!', 12),
    role: 'ADMIN',
    createdAt: now,
  });

  const p1 = em.create(Product, { 
    name: 'Poncho', 
    description: 'Your compact, eco-friendly companion for rainy days!', 
    priceCents: 1500, 
    stock: 25,
    createdAt:now, 
    isActive: true,
  });
  
  const p2 = em.create(Product, { 
    name: 'Umbrella', 
    description: 'Dance in the rain with the playful Essential Leaf umbrella from Mandai Wildlife Reserve!', 
    priceCents: 1500, 
    stock: 30,
    createdAt: now, 
    isActive: true,
  });

  await em.persistAndFlush([admin, p1, p2]);
  await orm.close(true);
  console.log('Seeded.');
})();