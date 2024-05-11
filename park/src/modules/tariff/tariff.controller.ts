import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { TariffService } from './tariff.service';
import { TariffEntity } from './entities/tariff.entity';
import { ParkService } from '../park/park.service';

@Controller()
export class TariffController {
  constructor(
    private readonly tariffService: TariffService,
    private readonly parkService: ParkService,
  ) {}

  @GrpcMethod('TariffService', 'create')
  async create(@Payload() createPlaceDto: Partial<TariffEntity>) {
    await this.parkService.findOne(Number(createPlaceDto.park));

    return this.tariffService.create(createPlaceDto);
  }

  @GrpcMethod('TariffService', 'findAll')
  findAll() {
    return this.tariffService.findAll();
  }

  @GrpcMethod('TariffService', 'findOne')
  findOne(@Payload() data: { id: number }) {
    return this.tariffService.findOne(data.id);
  }

  @GrpcMethod('TariffService', 'update')
  async update(@Payload() data: { id: number; dto: Partial<TariffEntity> }) {
    await this.parkService.findOne(Number(data.dto.park));

    return this.tariffService.update(data.id, data.dto);
  }

  @GrpcMethod('TariffService', 'remove')
  remove(@Payload() data: { id: number }) {
    return this.tariffService.remove(data.id);
  }
}
