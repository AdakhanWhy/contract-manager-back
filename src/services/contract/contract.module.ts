import { Module } from '@nestjs/common';
import { ContractController } from './contract.controller';
import { DatabaseModule } from 'src/db/database.module';
import { ContractService } from './contract.service';

@Module({
  imports: [DatabaseModule],
  providers: [ContractService],
  controllers: [ContractController],
})
export class ContractModule {}
