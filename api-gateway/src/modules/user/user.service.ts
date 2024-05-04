import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_PACKAGE } from 'src/common/const/microservices';
import { ClientGrpc } from '@nestjs/microservices';
import { LoginDto } from '../user/dto/login-user.dto';
import { ILoginData, IUserService } from './interfaces/user.service';
import { UserEntity } from './entities/user.entity';
import { ResData } from 'src/lib/resData';
import { lastValueFrom } from 'rxjs';
import { log } from 'console';

@Injectable()
export class UserService implements IUserService {
  private userService: any;

  constructor(@Inject(USER_PACKAGE) private Userclient: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.Userclient.getService('UserService');
  }

  register(dto: CreateUserDto) {
    const data = this.userService.create({
      ...dto,
    });

    return data;
  }

  async login(dto: LoginDto): Promise<ResData<ILoginData>> {
    const dataObservable = this.userService.login({
      phone: dto.phone,
      password: dto.password,
    });

    const foundUserByPhone: ResData<ILoginData> =
      await lastValueFrom(dataObservable);

    return foundUserByPhone;
  }

  async findAll() {
    return await this.userService.findAll({});
  }

  async findOneById(id: number): Promise<ResData<UserEntity>> {
    return await this.userService.findOne({ id });
  }
  async update(id: number, dto: UpdateUserDto): Promise<ResData<UserEntity>> {
    return await this.userService.update({ id, dto });
  }

  async delete(id: number): Promise<ResData<UserEntity>> {
    return await this.userService.remove({ id });
  }

  findOneByPhone(phone: string): Promise<ResData<UserEntity>> {
    throw new Error('Method not implemented.');
  }
}
