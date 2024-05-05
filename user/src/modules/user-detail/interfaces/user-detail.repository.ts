import { CreateUserDetailDto } from '../dto/create-user-detail.dto';
import { UserDetailEntity } from '../entities/user-detail.entity';

export interface IUserDetailRepository {
  insert(dto: CreateUserDetailDto): Promise<UserDetailEntity>;
  findAll(): Promise<Array<UserDetailEntity>>;
  findOneById(id: number): Promise<UserDetailEntity | null>;
  update(entity: UserDetailEntity): Promise<UserDetailEntity>;
  delete(entity: UserDetailEntity): Promise<UserDetailEntity>;
}
