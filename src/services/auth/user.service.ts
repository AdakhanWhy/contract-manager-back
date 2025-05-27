import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/db/repository/user.repository';
import { Tokens } from './entities/tokens';
import { SignUpWithPhoneDto } from './dto/signUpWithPhone.dto';
import { UserEntity } from './entities/user.entity';
import { JwtPayload, JwtPayloadInput } from 'src/common/interfaces/jwt-payload';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { createId } from '@paralleldrive/cuid2';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/common/config/jwt.config';
import { JwtConfig } from 'src/common/interfaces/jwt-config.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly config: JwtConfig,
  ) {}

  async signUp(data: SignUpWithPhoneDto): Promise<Tokens> {
    const hashedPassword = await this.hashPassword(data.newPassword);
    const user = await this.userRepository.create({
      phone: data.phone,
      firstName: data.firstName,
      lastName: data.lastName,
      encryptedPassword: hashedPassword,
    });
    const tokens = await this.getTokens(user);
    return tokens;
  }

  async login(phone: string, password: string): Promise<Tokens> {
    const user = await this.userRepository.findByPhone(phone);
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordCorrect = await this.comparePassword(
      password,
      user.encryptedPassword,
    );

    if (!isPasswordCorrect) {
      throw new Error('Incorrect password');
    }

    const tokens = await this.getTokens(user);
    return tokens;
  }

  profileEntityToJWTPayload(user: UserEntity): JwtPayloadInput {
    const payload: JwtPayloadInput = {
      userId: user.id,
      phone: user.phone?.toString() ?? '',
    };
    return payload;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }

  async getTokens(user: UserEntity): Promise<Tokens> {
    const payload = this.profileEntityToJWTPayload(user);
    const [accessToken, refreshToken] = await Promise.all([
      this.createAccessToken(payload),
      this.createRefreshToken(payload),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async createAccessToken(payload: JwtPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.config.accessTokenSecret,
      subject: payload.userId,
      jwtid: createId(),
    });
  }

  private async createRefreshToken(payload: JwtPayload): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.config.refreshTokenSecret,
      subject: payload.userId,
      expiresIn: this.config.refreshTokenLifetime,
      jwtid: createId(),
    });

    return refreshToken;
  }

  async hashData(data: string): Promise<string> {
    const result = crypto.createHash('sha256').update(data).digest('hex');
    return Promise.resolve(result);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
