import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { IUserDetailRepository } from './interfaces/user-detail.repository';
import { ResData } from 'src/lib/resData';
import { UserDetailEntity } from './entities/user-detail.entity';
import { UserDetailNotFoundRpcException } from './exception/user-detail.exception';
import { IUserDetailService } from './interfaces/user-detail.service';

@Injectable()
export class UserDetailService implements IUserDetailService {
  constructor(
    @Inject('IUserDetailRepository')
    private readonly userRepository: IUserDetailRepository,
  ) {}

  async create(dto: CreateUserDetailDto) {
    
    const data = await this.userRepository.insert(dto);

    return new ResData<UserDetailEntity>(
      'UserDetail was created successfully',
      HttpStatus.CREATED,
      data,
    );
  }

  async findAll() {
    console.log(await this.userRepository.findAll());
    
    const data = await this.userRepository.findAll();

    return new ResData<Array<UserDetailEntity>>(
      'UserDetails were found successfully',
      200,
      data,
    );
  }

  async findOneById(id: number) {
    const data = await this.userRepository.findOneById(id);

    if (!data) {
      throw new UserDetailNotFoundRpcException();
    }

    return new ResData<UserDetailEntity>(
      'UserDetail was found successfully',
      200,
      data,
    );
  }

  async update(id: number, updateUserDetailDto: UpdateUserDetailDto) {
    const { data: foundData } = await this.findOneById(id);

    if (!foundData) {
      throw new UserDetailNotFoundRpcException();
    }

    const updateEntity = Object.assign(foundData, updateUserDetailDto);

    const data = await this.userRepository.update(updateEntity);

    return new ResData<UserDetailEntity>(
      'UserDetail was updated successfully',
      200,
      data,
    );
  }

  async delete(id: number) {
    const { data: foundData } = await this.findOneById(id);

    const data = await this.userRepository.delete(foundData);

    return new ResData('UserDetail was deleted successfully', 200, data);
  }
}
