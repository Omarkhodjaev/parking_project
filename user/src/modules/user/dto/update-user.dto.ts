import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {}

export class IUpdateUserDto {
  id: number;
  dto: CreateUserDto;
}
