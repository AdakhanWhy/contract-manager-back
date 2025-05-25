import { Inject, Injectable } from '@nestjs/common';
import * as schema from '../schema';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DEFAULT_DB_CONNECTION } from 'src/common/constans';
import { ContractEntity } from 'src/services/contract/entities/contract.entity';
import { ContractMapper } from './mapper/contract.mapper';
import { eq } from 'drizzle-orm';
import { CreateContractDto } from 'src/services/contract/dto/create-contract.dto';
import { UpdateContractDto } from 'src/services/contract/dto/update-contract.dto';

@Injectable()
export class ContractRepository {
  constructor(
    @Inject(DEFAULT_DB_CONNECTION)
    private readonly db: PostgresJsDatabase<typeof schema>,
  ) {}

  async findAll(): Promise<ContractEntity[]> {
    const data = await this.db.select().from(schema.contract);

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

  async create(data: CreateContractDto): Promise<ContractEntity> {
    const result = (
      await this.db.insert(schema.contract).values(data).returning()
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
}
