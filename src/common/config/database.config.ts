import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from 'src/db/interfaces/database-config.interface';
import { z } from 'zod';

const EnvSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
});

const LoadConfigSchema = EnvSchema.transform((env) => {
  return {
    databaseUrl: env.DATABASE_URL,
  } satisfies DatabaseConfig;
});

export const databaseConfig = registerAs('db-config', () => {
  return LoadConfigSchema.parse(process.env);
});
