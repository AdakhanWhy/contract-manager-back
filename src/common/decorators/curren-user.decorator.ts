import {
  createParamDecorator,
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload';
import { Request } from 'express';

export const getUserFromExecutionContext = (context: ExecutionContext) => {
  if (context.getType() === 'http') {
    const req = context.switchToHttp().getRequest<Request>();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return req.user;
  }
};

export const CurrentUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, context: ExecutionContext) => {
    try {
      const user = JwtPayload.create(getUserFromExecutionContext(context));
      if (!data) return user;
      return user[data];
    } catch (error) {
      const logger = new Logger('@CurrentUser()');
      logger.error(error);
      throw new UnauthorizedException('User not found');
    }
  },
);
