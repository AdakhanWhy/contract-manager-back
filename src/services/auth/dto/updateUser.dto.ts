export class UpdateUserDto {
  phone?: string;
  firstName?: string | null;
  lastName?: string | null;
  encryptedPassword?: string;
}
