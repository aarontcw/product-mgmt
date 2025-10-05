import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MikroORM, EntityManager } from '@mikro-orm/core';
import { User, UserRole } from './entities/user.entity';
import { Product } from './entities/product.entity';
import * as bcrypt from 'bcrypt';

async function seed(em: EntityManager) { 
  const adminEmail = 'admin@example.com';
  if (!(await em.findOne(User, { email: adminEmail }))) {
    const passwordHash = await bcrypt.hash('Admin123!', 10);
    em.persist(em.create(User, { 
      email: adminEmail, 
      passwordHash, 
      role: UserRole.ADMIN, 
      createdAt: new Date() 
    }));
  }

  const userEmail = 'user@example.com';
  if (!(await em.findOne(User, { email: userEmail }))) {
    const passwordHash = await bcrypt.hash('User123!', 10);
    em.persist(em.create(User, { 
      email: userEmail, 
      passwordHash, 
      role: UserRole.USER, 
      createdAt: new Date()
    }));
  }

  const now = new Date();
  if (!(await em.findOne(Product, { name: 'Poncho' }))) {
    em.persist(em.create(Product, {
      name: 'Poncho',
      description: 'Your compact, eco-friendly companion for rainy days!',
      priceCents: 1500, stock: 25, isActive: true, createdAt: now
    }));
  }

  if (!(await em.findOne(Product, { name: 'Umbrella' }))) {
    em.persist(em.create(Product, {
      name: 'Umbrella',
      description: 'Dance in the rain with the playful Essential Leaf umbrella!',
      priceCents: 1500, stock: 30, isActive: true, createdAt: now
    }));
  }

  await em.flush();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const orm = app.get(MikroORM);
  await orm.getSchemaGenerator().updateSchema();
  await seed(orm.em.fork());

  app.enableCors({ origin: 'http://localhost:5173', credentials: true });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();