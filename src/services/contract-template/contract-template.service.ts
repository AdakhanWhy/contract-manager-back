import { ContractTemplateRepository } from 'src/db/repository/contract-template.repository';
import { ContractTemplateEntity } from './entities/contract-template.entity';
import { Injectable } from '@nestjs/common';
import { CreateContractTemplateDto } from './dto/create-contract-template.dto';
import { UpdateContractTemplateDto } from './dto/update-contract-template.dto';

@Injectable()
export class ContractTemplateService {
  constructor(
    private readonly contractTemplateRepository: ContractTemplateRepository,
  ) {}

  async findAll(): Promise<ContractTemplateEntity[]> {
    return this.contractTemplateRepository.findAll();
  }

  async findById(id: string): Promise<ContractTemplateEntity | null> {
    return this.contractTemplateRepository.findById(id);
  }

  async create(
    data: CreateContractTemplateDto,
  ): Promise<ContractTemplateEntity> {
    return this.contractTemplateRepository.create(data);
  }

  async update(
    id: string,
    data: UpdateContractTemplateDto,
  ): Promise<ContractTemplateEntity> {
    return this.contractTemplateRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.contractTemplateRepository.delete(id);
  }
}
