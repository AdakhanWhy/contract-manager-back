import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { ContractTemplateService } from './contract-template.service';
import { ContractTemplateController } from './contract-template.controller';

@Module({
  imports: [DatabaseModule],
  providers: [ContractTemplateService],
  controllers: [ContractTemplateController],
})
export class ContractTemplateModule {}
