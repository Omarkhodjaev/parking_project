import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { PlaceService } from './place.service';
import { LayerService } from '../layer/layer.service';
import { PlaceEntity } from './entities/place.entity';

@Controller()
export class PlaceController {
  constructor(
    private readonly placeService: PlaceService,
    private readonly layerService: LayerService,
  ) {}

  @GrpcMethod('PlaceService', 'create')
  async create(@Payload() createPlaceDto: Partial<PlaceEntity>) {
    await this.layerService.findOne(Number(createPlaceDto.layer));

    return this.placeService.create(createPlaceDto);
  }

  @GrpcMethod('PlaceService', 'findAll')
  findAll() {
    return this.placeService.findAll();
  }

  @GrpcMethod('PlaceService', 'findOne')
  findOne(@Payload() data: { id: number }) {
    return this.placeService.findOne(data.id);
  }

  @GrpcMethod('PlaceService', 'update')
  async update(@Payload() data: { id: number; dto: Partial<PlaceEntity> }) {
    await this.layerService.findOne(Number(data.dto.layer));

    return this.placeService.update(data.id, data.dto);
  }

  @GrpcMethod('PlaceService', 'remove')
  remove(@Payload() data: { id: number }) {
    return this.placeService.remove(data.id);
  }
}
