import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: EntityRepository<User>) {}

  create(data: Pick<User, 'email' | 'passwordHash' | 'role'>) {
    const u = this.repo.create(data);
    return this.repo.getEntityManager().persistAndFlush(u).then(() => u);
  }
  findByEmail(email: string) { return this.repo.findOne({ email }); }
  findById(id: string) { return this.repo.findOne({ id }); }
}