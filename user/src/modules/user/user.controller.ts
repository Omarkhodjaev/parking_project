import { Controller, Inject, UseFilters } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { AllExceptionsFilter } from 'src/lib/AllExceptionFilter';
import { IUserService } from './interfaces/user.service';

@Controller()
export class UserController {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {}
  @UseFilters(new AllExceptionsFilter())
  @GrpcMethod('UserService', 'create')
  async create(@Payload() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @GrpcMethod('UserService', 'findAll')
  findAll() {
    return this.userService.findAll();
  }

  @GrpcMethod('UserService', 'findOne')
  findOne(@Payload() data: { id: number }) {
    return this.userService.findOneById(data.id);
  }

  @GrpcMethod('UserService', 'findOneByPhone')
  findOneByPhone(@Payload() data: { phone: string }) {
    return this.userService.findOneByPhone(data.phone);
  }

  @GrpcMethod('UserService', 'update')
  update(@Payload() data: any) {
    return this.userService.update(data.id, data.dto);
  }

  @GrpcMethod('UserService', 'remove')
  remove(@Payload() data: { id: number }) {
    return this.userService.delete(data.id);
  }
}
