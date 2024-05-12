import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceRepository } from './service.repository';
import { ServiceEntity } from './entities/service.entity';
import { TariffRepository } from '../tariff/tariff.repository';
import { ServiceNotFoundRpcException } from './exception/service.exception';
import { ResData } from 'src/lib/resData';

@Injectable()
export class ServiceService {
  constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly tariffRepositoy: TariffRepository,
  ) {}

  async create(dto: Partial<ServiceEntity>) {
    const foundTariff = await this.tariffRepositoy.findOneById(dto.tariff);

    if (!foundTariff) {
      let end: any = new Date(dto.endedAt);
      let start: any = new Date(dto.startedAt);

      end = end.getTime();
      start = start.getTime();

      const timeDifference = end - start; // Calculate time difference in milliseconds
      const timeInSeconds = timeDifference / 1000; // Convert milliseconds to seconds
      const timeInMinutes = timeInSeconds / 60; // Convert seconds to minutes
      const timeInHours = timeInMinutes / 60; // Convert minutes to hours

      dto.price = timeInHours * dto.price;
      const data = await this.serviceRepository.insert(dto);
      return new ResData(
        'Service was created successfully',
        HttpStatus.CREATED,
        data,
      );
    }

    dto.price = foundTariff.price;

    const data = await this.serviceRepository.insert(dto);
    return new ResData(
      'Service was created successfully',
      HttpStatus.CREATED,
      data,
    );
  }

  async findAll() {
    const data = await this.serviceRepository.findAll();

    return new ResData('Services were successfully found', HttpStatus.OK, data);
  }

  async findOne(id: number) {
    const data = await this.serviceRepository.findOneById(id);

    if (!data) {
      throw new ServiceNotFoundRpcException();
    }

    return new ResData('Service was successfully found', HttpStatus.OK, data);
  }

  async remove(id: number) {
    const entity = await this.serviceRepository.findOneById(id);

    const data = await this.serviceRepository.delete(entity);
    return new ResData('Service was successfully removed', HttpStatus.OK, data);
  }
}
