import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginWithPhoneDto } from './dto/loginWithPhone.dto';
import { SignUpWithPhoneDto } from './dto/signUpWithPhone.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() data: SignUpWithPhoneDto) {
    return await this.userService.signUp(data);
  }

  @Post('login')
  async loginWithPhone(@Body() data: LoginWithPhoneDto) {
    return await this.userService.login(data.phone, data.password);
  }
}
