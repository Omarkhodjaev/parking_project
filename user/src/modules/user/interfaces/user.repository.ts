import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUserRepository {
  insert(entity: CreateUserDto): Promise<UserEntity>;
  findAll(): Promise<Array<UserEntity>>;
  update(dto: UserEntity): Promise<UserEntity>;
  delete(entity: UserEntity): Promise<UserEntity>;
  findOneByPhone(phone: string): Promise<UserEntity | null>;
  findOneById(id: number): Promise<UserEntity | null>;
}
