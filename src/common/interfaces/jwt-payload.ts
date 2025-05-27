import { createZodDto } from 'src/utils/zod.dto';
import {
  JwtPayloadBaseSchema,
  JwtUserSchema,
} from '../validation/jwt-payload.schema';

export interface JwtPayloadBaseSchema {
  iss?: string;
  sub?: string;
  aud?: string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}

export interface JwtUserInput {
  userId: string;
  phone: string;
}

export type JwtPayloadInput = JwtUserInput;

export type JwtUser = JwtPayloadBaseSchema & JwtUserInput;

export class JwtPayload extends createZodDto(JwtUserSchema) {}
