import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserTariffDto } from './dto/create-user-tariff.dto';
import { UserTariffRepository } from './user-tariff.repository';
import { UserTariffEntity } from './entities/user-tariff.entity';
import { ResData } from 'src/lib/resData';
import { UpdateUserTariffDto } from './dto/update-user-tariff.dto';
import { UserTariffNotFoundRpcException } from './exception/user.exception';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class UserTariffService {
  constructor(private readonly userTariffRepository: UserTariffRepository) {}

  async create(
    dto: CreateUserTariffDto,
    user: number,
  ): Promise<ResData<UserTariffEntity>> {
    const entity = new UserTariffEntity();

    entity.tariff = dto.tariff;
    entity.startedAt = dto.startedAt;
    entity.endedAt = dto.endedAt;
    entity.user = user

    const data = await this.userTariffRepository.insert(entity);

    return new ResData<UserTariffEntity>(
      'UserTariff was created successfully',
      HttpStatus.CREATED,
      data,
    );
  }

  async findOneById(id: number): Promise<ResData<UserTariffEntity>> {
    const data = await this.userTariffRepository.findOneById(id);

    if (!data) {
      throw new UserTariffNotFoundRpcException();
    }

    return new ResData<UserTariffEntity>(
      'UserTariff was found successfully',
      200,
      data,
    );
  }

  async findAll(): Promise<ResData<UserTariffEntity[]>> {
    const data = await this.userTariffRepository.findAll();

    return new ResData('Users were found successfully', 200, data);
  }

  async update(id: number, updateUserTariffDto: Partial<UserTariffEntity>) {
    const { data: foundData } = await this.findOneById(id);

    const updateData = Object.assign(foundData, updateUserTariffDto);

    console.log(updateData);

    const data = await this.userTariffRepository.update(updateData);

    return new ResData<UserTariffEntity>(
      'UserTariff was updated successfully',
      200,
      data,
    );
  }

  async delete(id: number) {
    const { data: foundData } = await this.findOneById(id);

    const data = await this.userTariffRepository.delete(foundData);

    return new ResData('UserTariff was deleted successfully', 200, data);
  }
}
