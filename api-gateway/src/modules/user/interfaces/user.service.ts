import { ResData } from 'src/lib/resData';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { LoginDto } from '../dto/login-user.dto';

export interface ILoginData {
  user: UserEntity;
  token: string;
}

export interface IUserService {
  findOneById(id: number): Promise<ResData<UserEntity>>;
  findAll(): Promise<ResData<Array<UserEntity>>>;
  update(id: number, dto: UpdateUserDto): Promise<ResData<UserEntity>>;
  delete(id: number): Promise<ResData<UserEntity>>;
  findOneByPhone(phone: string): Promise<ResData<UserEntity | null>>;
  register(dto: CreateUserDto): Promise<ResData<ILoginData>>;
  login(dto: LoginDto): Promise<ResData<ILoginData>>;
}
