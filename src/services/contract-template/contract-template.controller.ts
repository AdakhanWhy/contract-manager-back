import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ContractTemplateService } from './contract-template.service';
import { ContractTemplateEntity } from './entities/contract-template.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateContractTemplateDto } from './dto/create-contract-template.dto';
import { UpdateContractTemplateDto } from './dto/update-contract-template.dto';
import { JwtAuthGuard } from 'src/common/config/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
