import { Inject, Injectable } from '@nestjs/common';
import * as schema from '../schema';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DEFAULT_DB_CONNECTION } from 'src/common/constans';
import { eq } from 'drizzle-orm';
import { UserEntity } from 'src/services/auth/entities/user.entity';
import { UserMapper } from './mapper/user.mapper';
import { UpdateUserDto } from 'src/services/auth/dto/updateUser.dto';
import { CreateUserRepositoryDto } from '../dto/createUser.dto';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(DEFAULT_DB_CONNECTION)
    private readonly db: PostgresJsDatabase<typeof schema>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    const data = await this.db.select().from(schema.users);

    return data.map((item) => UserMapper.toEntity(item));
  }

  async findById(id: string): Promise<UserEntity | null> {
    const data = (
      await this.db.select().from(schema.users).where(eq(schema.users.id, id))
    ).at(0);

    if (!data) {
      throw new Error('User not found');
    }

    return UserMapper.toEntity(data);
  }

  async findByPhone(phone: string): Promise<UserEntity | null> {
    const data = (
      await this.db
        .select()
        .from(schema.users)
        .where(eq(schema.users.phone, phone))
    ).at(0);

    if (!data) {
      throw new Error('User not found');
    }

    return UserMapper.toEntity(data);
  }

  async create(data: CreateUserRepositoryDto): Promise<UserEntity> {
    const result = (
      await this.db.insert(schema.users).values(data).returning()
    ).at(0);

    if (!result) {
      throw new Error('Failed to create user');
    }
    return UserMapper.toEntity(result);
  }

  async update(id: string, data: UpdateUserDto): Promise<UserEntity> {
    const result = (
      await this.db
        .update(schema.users)
        .set(data)
        .where(eq(schema.users.id, id))
        .returning()
    ).at(0);

    if (!result) {
      throw new Error('Failed to update user');
    }

    return UserMapper.toEntity(result);
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(schema.users).where(eq(schema.users.id, id));
  }
}
