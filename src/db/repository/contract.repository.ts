import { Inject, Injectable } from '@nestjs/common';
import * as schema from '../schema';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DEFAULT_DB_CONNECTION } from 'src/common/constans';
import { ContractEntity } from 'src/services/contract/entities/contract.entity';
import { ContractMapper } from './mapper/contract.mapper';
import { asc, eq, like } from 'drizzle-orm';
import { CreateContractDto } from 'src/services/contract/dto/create-contract.dto';
import { UpdateContractDto } from 'src/services/contract/dto/update-contract.dto';
import { ContractFilterDto } from 'src/services/contract/dto/contract-filter.dto';

@Injectable()
export class ContractRepository {
  constructor(
    @Inject(DEFAULT_DB_CONNECTION)
    private readonly db: PostgresJsDatabase<typeof schema>,
  ) {}

  async findAll(filters: ContractFilterDto): Promise<ContractEntity[]> {
    const data = await this.db
      .select()
      .from(schema.contract)
      .where(
        filters.name
          ? like(schema.contract.title, `%${filters.name}%`)
          : undefined,
      )
      .orderBy(asc(schema.contract.createdAt));

    return data.map((item) => ContractMapper.toEntity(item));
  }

  async findById(id: string): Promise<ContractEntity | null> {
    const data = (
      await this.db
        .select()
        .from(schema.contract)
        .where(eq(schema.contract.id, id))
    ).at(0);

    if (!data) {
      throw new Error('Contract not found');
    }

    return ContractMapper.toEntity(data);
  }

  async create(
    data: CreateContractDto,
    userId: string,
  ): Promise<ContractEntity> {
    const result = (
      await this.db
        .insert(schema.contract)
        .values({
          ...data,
          userId,
        })
        .returning()
    ).at(0);

    if (!result) {
      throw new Error('Failed to create contract');
    }
    return ContractMapper.toEntity(result);
  }

  async update(id: string, data: UpdateContractDto): Promise<ContractEntity> {
    const result = (
      await this.db
        .update(schema.contract)
        .set(data)
        .where(eq(schema.contract.id, id))
        .returning()
    ).at(0);

    if (!result) {
      throw new Error('Failed to update contract');
    }

    return ContractMapper.toEntity(result);
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(schema.contract).where(eq(schema.contract.id, id));
  }

  async getContractsByUserId(userId: string): Promise<ContractEntity[]> {
    const data = await this.db
      .select()
      .from(schema.contract)
      .where(eq(schema.contract.userId, userId));

    return data.map((item) => ContractMapper.toEntity(item));
  }
}
