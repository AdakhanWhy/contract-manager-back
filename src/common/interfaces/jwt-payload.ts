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

export type JwtPayload = JwtUser;
