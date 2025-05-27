import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { JWT_ACCESS_TOKEN_STRATEGY } from '../constans';
import { jwtConfig } from './jwt.config';
import { JwtPayload } from '../interfaces/jwt-payload';
import {
  JwtUserInputSchema,
  JwtUserSchema,
} from '../validation/jwt-payload.schema';
import { JwtConfig } from '../interfaces/jwt-config.interface';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  JWT_ACCESS_TOKEN_STRATEGY,
) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly config: JwtConfig,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.accessTokenSecret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: unknown): Promise<JwtPayload> {
    try {
      const validatedPayload = JwtUserInputSchema.parse(payload);
      const parsedPayload = await JwtUserSchema.parseAsync(validatedPayload);
      return JwtPayload.create(parsedPayload);
    } catch (error) {
      console.log('Invalid access token', error);
      throw new Error('Invalid access token');
    }
  }
}
