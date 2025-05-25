import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ContractTemplateService } from './contract-template.service';
import { ContractTemplateEntity } from './entities/contract-template.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateContractTemplateDto } from './dto/create-contract-template.dto';
import { UpdateContractTemplateDto } from './dto/update-contract-template.dto';

@ApiTags('contract-template')
@Controller('contract-template')
export class ContractTemplateController {
  constructor(
    private readonly contractTemplateService: ContractTemplateService,
  ) {}

  @Get()
  async getAllContractTemplates(): Promise<ContractTemplateEntity[]> {
    return await this.contractTemplateService.findAll();
  }

  @Get(':id')
  async getContractTemplateById(
    @Param('id') id: string,
  ): Promise<ContractTemplateEntity | null> {
    return await this.contractTemplateService.findById(id);
  }

  @Post()
  async createContractTemplate(@Body() data: CreateContractTemplateDto) {
    return await this.contractTemplateService.create(data);
  }

  @Patch(':id')
  async updateContractTemplateById(
    @Param('id') id: string,
    @Body() data: UpdateContractTemplateDto,
  ) {
    return await this.contractTemplateService.update(id, data);
  }

  @Delete(':id')
  async deleteContractTemplateById(@Param('id') id: string) {
    return await this.contractTemplateService.delete(id);
  }
}
