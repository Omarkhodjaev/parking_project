import { UserEntity } from 'src/modules/user/entities/user.entity';

export class CreateUserDetailDto {
  firstName: string;

  lastName: string;

  avatar: number;

  userId: number;
}
