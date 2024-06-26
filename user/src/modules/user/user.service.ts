import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  UserNotFoundRpcException,
  UserPhoneAlreadyException,
} from './exception/user.exception';
import { ResData } from 'src/lib/resData';
import { IUserService } from './interfaces/user.service';
import { UserEntity } from './entities/user.entity';
import { IUserRepository } from './interfaces/user.repository';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async create(dto: CreateUserDto): Promise<ResData<UserEntity>> {
    const data = await this.userRepository.insert(dto);

    return new ResData<UserEntity>(
      'User was created successfully',
      HttpStatus.CREATED,
      data,
    );
  }

  async findOneById(id: number): Promise<ResData<UserEntity>> {
    const data = await this.userRepository.findOneById(id);

    if (!data) {
      throw new UserNotFoundRpcException();
    }

    return new ResData<UserEntity>('User was found successfully', 200, data);
  }

  async findOneByPhone(phone: string): Promise<ResData<UserEntity>> {
    const data = await this.userRepository.findOneByPhone(phone);

    const resData = new ResData(
      'User was found successfully by phone number',
      200,
      data,
    );
    if (!data) {
      resData.message = 'User not found by phone number';
      resData.statusCode = 404;
    }
    return resData;
  }

  async findAll(): Promise<ResData<UserEntity[]>> {
    const data = await this.userRepository.findAll();

    return new ResData('Users were found successfully', 200, data);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { data: foundData } = await this.findOneById(id);

    const { data: foundUser } = await this.findOneByPhone(updateUserDto.phone);

    if (foundUser) {
      throw new UserPhoneAlreadyException();
    }

    const updateData = Object.assign(foundData, updateUserDto);

    const data = await this.userRepository.update(updateData);

    return new ResData<UserEntity>('User was updated successfully', 200, data);
  }

  async delete(id: number) {
    const { data: foundData } = await this.findOneById(id);

    const data = await this.userRepository.delete(foundData);

    return new ResData('User was deleted successfully', 200, data);
  }
}
