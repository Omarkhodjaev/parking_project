import { Controller, Inject, UseFilters } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { UserTariffService } from './user-tariff.service';
import { CreateUserTariffDto } from './dto/create-user-tariff.dto';
import { AllExceptionsFilter } from 'src/lib/AllExceptionFilter';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { UserTariffEntity } from './entities/user-tariff.entity';

@Controller()
export class UserTariffController {
  constructor(
    private readonly userTariffService: UserTariffService,
    @Inject('IUserService')
    private readonly userService: UserService,
  ) {}

  @UseFilters(new AllExceptionsFilter())
  @GrpcMethod('UserTariffService', 'create')
  async create(@Payload() createUserTariffDto: CreateUserTariffDto) {
    const { data: foundUser } = await this.userService.findOneById(
      createUserTariffDto.user,
    );

    return await this.userTariffService.create(
      createUserTariffDto,
      foundUser.id,
    );
  }

  @GrpcMethod('UserTariffService', 'findAll')
  findAll() {
    return this.userTariffService.findAll();
  }

  @GrpcMethod('UserTariffService', 'findOne')
  findOne(@Payload() data: { id: number }) {
    return this.userTariffService.findOneById(data.id);
  }

  @GrpcMethod('UserTariffService', 'update')
  async update(
    @Payload() data: { id: number; dto: Partial<UserTariffEntity> },
  ) {
    await this.userService.findOneById(data.dto.user);

    return this.userTariffService.update(data.id, data.dto);
  }

  @GrpcMethod('UserTariffService', 'remove')
  remove(@Payload() data: { id: number }) {
    return this.userTariffService.delete(data.id);
  }
}
