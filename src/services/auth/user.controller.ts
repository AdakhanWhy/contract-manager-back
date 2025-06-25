import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginWithPhoneDto } from './dto/loginWithPhone.dto';
import { SignUpWithPhoneDto } from './dto/signUpWithPhone.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() data: SignUpWithPhoneDto) {
    return await this.userService.signUp(data);
  }

  @Post('login')
  async loginWithPhone(
    @Body() data: LoginWithPhoneDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.userService.login(data.phone, data.password);

    // Установить access token
    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      // secure: true, // обязательно, если HTTPS
      sameSite: 'strict', // 'lax' если нужна ссылка с других сайтов
      maxAge: 60 * 60 * 1000, // 1 час
    });

    // Установить refresh token
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      // secure: true,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
    });

    return { success: true };
  }
}
