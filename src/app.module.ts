import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { ContractModule } from './services/contract/contract.module';
import { ContractTemplateModule } from './services/contract-template/contract-template.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ContractModule,
    ContractTemplateModule,
  ],
})
export class AppModule {}
