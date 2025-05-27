import * as z from 'zod';
import { ApiProperty } from '@nestjs/swagger';

export const loginWithPhoneSchema = z.object({
  phone: z.string(),
  password: z.string().min(6),
});

export class LoginWithPhoneDto implements z.infer<typeof loginWithPhoneSchema> {
  static schema = loginWithPhoneSchema;
  static isZodDto = true;

  @ApiProperty()
  phone!: string;
  @ApiProperty()
  password!: string;
}
