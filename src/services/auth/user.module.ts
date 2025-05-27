import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/common/config/jwt.config';
import { JwtConfig } from 'src/common/interfaces/jwt-config.interface';
import { AccessTokenStrategy } from 'src/common/config/jwt-access-token.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forFeature(jwtConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [jwtConfig.KEY],
      useFactory: (config: JwtConfig) => ({
        secret: config.accessTokenSecret,
        signOptions: {
          expiresIn: config.accessTokenLifetime,
          issuer: 'adahan',
          algorithm: 'HS256',
        },
      }),
    }),
  ],
  providers: [UserService, AccessTokenStrategy],
  controllers: [UserController],
})
export class UserModule {}
