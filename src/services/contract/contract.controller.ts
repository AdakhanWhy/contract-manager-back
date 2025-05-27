import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractEntity } from './entities/contract.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { JwtAuthGuard } from 'src/common/config/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/curren-user.decorator';
import { JwtPayload } from 'src/common/interfaces/jwt-payload';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('contract')
@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  async createContract(
    @CurrentUser() user: JwtPayload,
    @Body() data: CreateContractDto,
  ) {
    return await this.contractService.create(data, user.userId);
  }

  @Get()
  async getAllContracts(
    @Query('name') name?: string,
    @Query('userId') userId?: string,
  ): Promise<ContractEntity[]> {
    return await this.contractService.findAll({
      name,
      userId,
    });
  }

  @Get('user-me')
  async getUserMe(@CurrentUser() user: JwtPayload) {
    return await this.contractService.findByUserId(user.userId);
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
