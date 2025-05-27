import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { ContractModule } from './services/contract/contract.module';
import { ContractTemplateModule } from './services/contract-template/contract-template.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './services/auth/user.module';
import { jwtConfig } from './common/config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }),
    DatabaseModule,
    ContractModule,
    ContractTemplateModule,
    UserModule,
  ],
})
export class AppModule {}
