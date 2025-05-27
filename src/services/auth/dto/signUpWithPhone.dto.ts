import { ApiProperty } from '@nestjs/swagger';
import * as z from 'zod';

export const signUpWithPhoneSchema = z
  .object({
    phone: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    newPassword: z.string().min(6),
    passwordConfirm: z.string().min(6),
  })
  .refine((val) => val.newPassword === val.passwordConfirm, {
    message: 'Пароли не совпадают',
    path: ['passwordConfirm'],
  });

export class SignUpWithPhoneDto
  implements z.output<typeof signUpWithPhoneSchema>
{
  static schema = signUpWithPhoneSchema;
  static isZodDto = true;

  @ApiProperty()
  phone!: string;
  @ApiProperty()
  firstName!: string;
  @ApiProperty()
  lastName!: string;
  @ApiProperty()
  newPassword!: string;
  @ApiProperty()
  passwordConfirm!: string;
}
