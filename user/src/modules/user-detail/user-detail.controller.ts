import { Controller, Inject, UseFilters } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { IUserDetailService } from './interfaces/user-detail.service';
import { AllExceptionsFilter } from 'src/lib/AllExceptionFilter';
import { IUserService } from '../user/interfaces/user.service';

@Controller()
export class UserDetailController {
  constructor(
    @Inject('IUserDetailService')
    private readonly userDetailService: IUserDetailService,
    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {}

  @GrpcMethod('UserDetailService', 'create')
  async create(@Payload() createUserDetailDto: CreateUserDetailDto) {
    await this.userService.findOneById(createUserDetailDto.user);

    return this.userDetailService.create(createUserDetailDto);
  }

  @GrpcMethod('UserDetailService', 'findAll')
  findAll() {
    return this.userDetailService.findAll();
  }

  @GrpcMethod('UserDetailService', 'findOne')
  findOne(@Payload() data: { id: number }) {
    return this.userDetailService.findOneById(data.id);
  }

  @GrpcMethod('UserDetailService', 'update')
  async update(@Payload() data: any) {
    await this.userService.findOneById(data.dto.user);

    return this.userDetailService.update(data.id, data);
  }

  @GrpcMethod('UserDetailService', 'remove')
  remove(@Payload() data: { id: number }) {
    return this.userDetailService.delete(data.id);
  }
}
