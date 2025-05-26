import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractEntity } from './entities/contract.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@ApiTags('contract')
@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  async createContract(@Body() data: CreateContractDto) {
    return await this.contractService.create(data);
  }

  @Get()
  async getAllContracts(
    @Query('name') name?: string,
  ): Promise<ContractEntity[]> {
    return await this.contractService.findAll({
      name,
    });
  }

  @Get(':id')
  async getContractById(
    @Param('id') id: string,
  ): Promise<ContractEntity | null> {
    return await this.contractService.findById(id);
  }

  @Patch(':id')
  async updateContractById(
    @Param('id') id: string,
    @Body() data: UpdateContractDto,
  ) {
    return await this.contractService.update(id, data);
  }

  @Delete(':id')
  async deleteContractById(@Param('id') id: string) {
    return await this.contractService.delete(id);
  }
}
