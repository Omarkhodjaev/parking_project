import { Controller, Inject, UseFilters } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { AllExceptionsFilter } from 'src/lib/AllExceptionFilter';
import { IUserService } from './interfaces/user.service';
import { IUpdateUserDto } from './dto/update-user.dto';

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

  @GrpcMethod('UserService', 'update')
  update(@Payload() data: IUpdateUserDto) {
    return this.userService.update(data.id, data.dto);
  }

  @GrpcMethod('UserService', 'remove')
  remove(@Payload() id: number) {
    return this.userService.delete(id);
  }
}
