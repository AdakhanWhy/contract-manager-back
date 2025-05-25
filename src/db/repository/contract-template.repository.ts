import { Inject, Injectable, Logger } from '@nestjs/common';
import * as schema from '../schema';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DEFAULT_DB_CONNECTION } from 'src/common/constans';
import { eq } from 'drizzle-orm';
import { ContractTemplateEntity } from 'src/services/contract-template/entities/contract-template.entity';
import { ContractTemplateMapper } from './mapper/contract-template.mapper';
import { CreateContractTemplateDto } from 'src/services/contract-template/dto/create-contract-template.dto';
import { UpdateContractTemplateDto } from 'src/services/contract-template/dto/update-contract-template.dto';

@Injectable()
export class ContractTemplateRepository {
  private readonly logger = new Logger(ContractTemplateRepository.name);
  constructor(
    @Inject(DEFAULT_DB_CONNECTION)
    private readonly db: PostgresJsDatabase<typeof schema>,
  ) {}

  async findAll(): Promise<ContractTemplateEntity[]> {
    const data = await this.db.select().from(schema.contractTemplate);

    return data.map((item) => ContractTemplateMapper.toEntity(item));
  }

  async findById(id: string): Promise<ContractTemplateEntity | null> {
    const data = (
      await this.db
        .select()
        .from(schema.contractTemplate)
        .where(eq(schema.contractTemplate.id, id))
    ).at(0);

    if (!data) {
      throw new Error('ContractTemplate not found');
    }

    return ContractTemplateMapper.toEntity(data);
  }

  async create(
    data: CreateContractTemplateDto,
  ): Promise<ContractTemplateEntity> {
    this.logger.debug(data);
    const result = (
      await this.db.insert(schema.contractTemplate).values(data).returning()
    ).at(0);

    this.logger.debug(result);
    if (!result) {
      throw new Error('Failed to create contracttemplate');
    }
    return ContractTemplateMapper.toEntity(result);
  }

  async update(
    id: string,
    data: UpdateContractTemplateDto,
  ): Promise<ContractTemplateEntity> {
    const result = (
      await this.db
        .update(schema.contractTemplate)
        .set(data)
        .where(eq(schema.contractTemplate.id, id))
        .returning()
    ).at(0);

    if (!result) {
      throw new Error('Failed to update contractTemplate');
    }

    return ContractTemplateMapper.toEntity(result);
  }

  async delete(id: string): Promise<void> {
    await this.db
      .delete(schema.contractTemplate)
      .where(eq(schema.contractTemplate.id, id));
  }
}
