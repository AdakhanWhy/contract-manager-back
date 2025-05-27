import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_ACCESS_TOKEN_STRATEGY } from '../constans';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_ACCESS_TOKEN_STRATEGY) {}
