import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_PACKAGE } from 'src/common/const/microservices';
import { ClientGrpc } from '@nestjs/microservices';
import { LoginDto } from '../user/dto/login-user.dto';
import { ILoginData, IUserService } from './interfaces/user.service';
import { UserEntity } from './entities/user.entity';
import { ResData } from 'src/lib/resData';
import { lastValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { LoginOrPasswordWrong } from './exception/user.exception';

@Injectable()
export class UserService implements IUserService {
  private userService: any;

  constructor(
    @Inject(USER_PACKAGE) private Userclient: ClientGrpc,
    private jwtService: JwtService,
  ) {}

  onModuleInit() {
    this.userService = this.Userclient.getService('UserService');
  }

  async register(dto: CreateUserDto) {
    const dataObservable = this.userService.create({
      ...dto,
    });

    const { data: foundUserByPhone } =
      await lastValueFrom<ResData<UserEntity>>(dataObservable);

    const token = await this.jwtService.signAsync({ id: foundUserByPhone.id });

    return new ResData('User was successfully registered', HttpStatus.CREATED, {
      user: foundUserByPhone,
      token,
    });
  }

  async login(dto: LoginDto): Promise<ResData<ILoginData>> {
    const dataObservable = this.userService.findOneByPhone({
      phone: dto.phone,
    });

    const { data: foundUserByPhone } =
      await lastValueFrom<ResData<UserEntity>>(dataObservable);

    if (!foundUserByPhone || foundUserByPhone.password !== dto.password) {
      throw new LoginOrPasswordWrong();
    }

    const token = await this.jwtService.signAsync({ id: foundUserByPhone.id });

    const data = new ResData('User was login successfully', HttpStatus.OK, {
      user: foundUserByPhone,
      token,
    });

    return data;
  }

  async findAll() {
    return await this.userService.findAll({});
  }

  async findOneById(id: number) {
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
