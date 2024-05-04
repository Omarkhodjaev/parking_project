import { RoleEnum } from 'src/common/types/enums';

export class CreateUserDto {
  phone: string;
  password: string;
  role: RoleEnum;
  parkId: number;
}
