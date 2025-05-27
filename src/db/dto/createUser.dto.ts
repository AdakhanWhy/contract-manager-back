export class CreateUserRepositoryDto {
  phone: string;
  firstName: string | null;
  lastName: string | null;
  encryptedPassword: string;
}
