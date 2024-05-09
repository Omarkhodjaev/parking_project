import { Controller, Inject, UseFilters } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { IUserDetailService } from './interfaces/user-detail.service';
import { AllExceptionsFilter } from 'src/lib/AllExceptionFilter';

@Controller()
export class UserDetailController {
  constructor(
    @Inject('IUserDetailService')
    private readonly userDetailService: IUserDetailService,
  ) {}
  @UseFilters(new AllExceptionsFilter())
  @GrpcMethod('UserDetailService', 'create')
  async create(@Payload() createUserDetailDto: CreateUserDetailDto) {
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
  update(@Payload() data: any) {
    return this.userDetailService.update(data.id, data);
  }

  @GrpcMethod('UserDetailService', 'remove')
  remove(@Payload() data: { id: number }) {
    return this.userDetailService.delete(data.id);
  }
}
