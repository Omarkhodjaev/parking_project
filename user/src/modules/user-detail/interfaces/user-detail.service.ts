import { ResData } from 'src/lib/resData';
import { CreateUserDetailDto } from '../dto/create-user-detail.dto';
import { UserDetailEntity } from '../entities/user-detail.entity';
import { UpdateUserDetailDto } from '../dto/update-user-detail.dto';

export interface IUserDetailService {
  create(dto: CreateUserDetailDto): Promise<ResData<UserDetailEntity>>;
  findOneById(id: number): Promise<ResData<UserDetailEntity>>;
  findAll(): Promise<ResData<Array<UserDetailEntity>>>;
  update(
    id: number,
    dto: UpdateUserDetailDto,
  ): Promise<ResData<UserDetailEntity>>;
  delete(id: number): Promise<ResData<UserDetailEntity>>;
}
