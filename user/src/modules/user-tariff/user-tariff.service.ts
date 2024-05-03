import { Injectable } from '@nestjs/common';
import { CreateUserTariffDto } from './dto/create-user-tariff.dto';
import { UpdateUserTariffDto } from './dto/update-user-tariff.dto';

@Injectable()
export class UserTariffService {
  create(createUserTariffDto: CreateUserTariffDto) {
    return 'This action adds a new userTariff';
  }

  findAll() {
    return `This action returns all userTariff`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userTariff`;
  }

  update(id: number, updateUserTariffDto: UpdateUserTariffDto) {
    return `This action updates a #${id} userTariff`;
  }

  remove(id: number) {
    return `This action removes a #${id} userTariff`;
  }
}
