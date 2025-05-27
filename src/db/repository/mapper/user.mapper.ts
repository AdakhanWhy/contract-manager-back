import { InsertUsersData, SelectUsersData } from 'src/db/schema';
import { UserEntity } from 'src/services/auth/entities/user.entity';

export class UserMapper {
  static toInsertData(data: UserEntity): InsertUsersData {
    return {
      phone: data.phone,
      firstName: data.firstName,
      lastName: data.lastName,
      encryptedPassword: data.encryptedPassword,
    };
  }

  static toEntity(data: SelectUsersData): UserEntity {
    return {
      id: data.id,
      phone: data.phone,
      firstName: data.firstName ?? null,
      lastName: data.lastName ?? null,
      encryptedPassword: data.encryptedPassword,
    };
  }
}
