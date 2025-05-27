export type UserEntity = {
  id: string;
  phone: string;
  firstName: string | null;
  lastName: string | null;
  encryptedPassword: string;
};
