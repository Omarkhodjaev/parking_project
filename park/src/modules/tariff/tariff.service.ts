import { HttpStatus, Injectable } from '@nestjs/common';
import { ResData } from 'src/lib/resData';
import { TariffEntity } from './entities/tariff.entity';
import { TariffRepository } from './tariff.repository';
import { TariffNotFoundRpcException } from './exception/tariff.exception';

@Injectable()
export class TariffService {
  constructor(private readonly tariffRepository: TariffRepository) {}

  async create(createTariffDto: Partial<TariffEntity>) {
    
    
    const data = await this.tariffRepository.insert(createTariffDto);

    return new ResData(
      'Tariff was successfully created',
      HttpStatus.CREATED,
      data,
    );
  }

  async findAll() {
    const data = await this.tariffRepository.findAll();

    return new ResData('Tariffs were successfully found', HttpStatus.OK, data);
  }

  async findOne(id: number) {
    const data = await this.tariffRepository.findOneById(id);

    if (!data) {
      throw new TariffNotFoundRpcException();
    }

    return new ResData('Tariff was successfully found', HttpStatus.OK, data);
  }

  async update(id: number, updateTariffDto: Partial<TariffEntity>) {
    const { data: foundTariff } = await this.findOne(id);

    const updateData = Object.assign(foundTariff, updateTariffDto);

    const data = await this.tariffRepository.update(updateData);
    return new ResData('Tariff was updated successfully', HttpStatus.OK, data);
  }

  async remove(id: number) {
    const { data: foundTariff } = await this.findOne(id);
    await this.tariffRepository.delete(foundTariff);

    return new ResData(
      'Tariff was successfully removed',
      HttpStatus.OK,
      foundTariff,
    );
  }
}
