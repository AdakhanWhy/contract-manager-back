import { z } from 'zod';

export const JwtPayloadBaseSchema = z.object({
  iss: z.string().optional(),
  sub: z.string().optional(),
  aud: z.string().array().optional(),
  exp: z.number().optional(),
  nbf: z.number().optional(),
  iat: z.number().optional(),
  jti: z.string().optional(),
});

export const JwtUserInputSchema = z.object({
  userId: z.string(),
  phone: z.string(),
});

export const JwtUserSchema = JwtUserInputSchema.merge(JwtPayloadBaseSchema);
