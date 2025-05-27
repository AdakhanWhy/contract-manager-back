import { Global, Module } from '@nestjs/common';
import * as postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { ConfigModule } from '@nestjs/config';
import * as schema from './schema';
import { DatabaseConfig } from './interfaces/database-config.interface';
import { databaseConfig } from 'src/common/config/database.config';
import { DEFAULT_DB_CONNECTION } from 'src/common/constans';
import { ContractRepository } from './repository/contract.repository';
import { ContractTemplateRepository } from './repository/contract-template.repository';
import { UserRepository } from './repository/user.repository';

@Global()
@Module({
  imports: [ConfigModule.forFeature(databaseConfig)],
  providers: [
    {
      provide: DEFAULT_DB_CONNECTION,
      inject: [databaseConfig.KEY],
      useFactory: (drizzleConfig: DatabaseConfig) => {
        const connection = postgres(drizzleConfig.databaseUrl);
        return drizzle(connection, {
          schema,
          logger: true,
        });
      },
    },
    ContractRepository,
    ContractTemplateRepository,
    UserRepository,
  ],
  exports: [ContractRepository, ContractTemplateRepository, UserRepository],
})
export class DatabaseModule {}
