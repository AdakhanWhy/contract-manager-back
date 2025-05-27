import { registerAs } from '@nestjs/config';
import { z } from 'zod';
import { JwtConfig } from '../interfaces/jwt-config.interface';

const EnvSchema = z.object({
  REFRESH_TOKEN_SECRET: z.string().min(1),
  REFRESH_TOKEN_LIFETIME: z.string().min(1).default('7d'),
  JWT_ACCESS_SECRET: z.string().min(1),
  JWT_ACCESS_LIFETIME: z.string().min(1).default('7d'),
});

const LoadConfigSchema = EnvSchema.transform((env) => {
  return {
    refreshTokenSecret: env.REFRESH_TOKEN_SECRET,
    refreshTokenLifetime: env.REFRESH_TOKEN_LIFETIME,
    accessTokenSecret: env.JWT_ACCESS_SECRET,
    accessTokenLifetime: env.JWT_ACCESS_LIFETIME,
  } satisfies JwtConfig;
});

export const jwtConfig = registerAs('jwt-config', () => {
  return LoadConfigSchema.parse(process.env);
});
