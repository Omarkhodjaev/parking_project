import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserTariffService } from './user-tariff.service';
import { CreateUserTariffDto } from './dto/create-user-tariff.dto';
import { UpdateUserTariffDto } from './dto/update-user-tariff.dto';

@Controller()
export class UserTariffController {
  constructor(private readonly userTariffService: UserTariffService) {}

  @MessagePattern('createUserTariff')
  create(@Payload() createUserTariffDto: CreateUserTariffDto) {
    return this.userTariffService.create(createUserTariffDto);
  }

  @MessagePattern('findAllUserTariff')
  findAll() {
    return this.userTariffService.findAll();
  }

  @MessagePattern('findOneUserTariff')
  findOne(@Payload() id: number) {
    return this.userTariffService.findOne(id);
  }

  @MessagePattern('updateUserTariff')
  update(@Payload() updateUserTariffDto: UpdateUserTariffDto) {
    return this.userTariffService.update(updateUserTariffDto.id, updateUserTariffDto);
  }

  @MessagePattern('removeUserTariff')
  remove(@Payload() id: number) {
    return this.userTariffService.remove(id);
  }
}
