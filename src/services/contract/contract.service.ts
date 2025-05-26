import { Injectable } from '@nestjs/common';
import { ContractRepository } from 'src/db/repository/contract.repository';
import { ContractEntity } from './entities/contract.entity';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ContractFilterDto } from './dto/contract-filter.dto';

@Injectable()
export class ContractService {
  constructor(private readonly contractRepository: ContractRepository) {}

  async findAll(filters: ContractFilterDto): Promise<ContractEntity[]> {
    return this.contractRepository.findAll(filters);
  }

  async findById(id: string): Promise<ContractEntity | null> {
    return this.contractRepository.findById(id);
  }

  async create(data: CreateContractDto): Promise<ContractEntity> {
    return this.contractRepository.create(data);
  }

  async update(id: string, data: UpdateContractDto): Promise<ContractEntity> {
    return this.contractRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.contractRepository.delete(id);
  }
}
