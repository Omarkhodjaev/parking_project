import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { LayerService } from './layer.service';
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';
import { ParkService } from '../park/park.service';
import { LayerEntity } from './entities/layer.entity';

@Controller()
export class LayerController {
  constructor(
    private readonly layerService: LayerService,
    private readonly parkService: ParkService,
  ) {}

  @GrpcMethod('LayerService', 'create')
  async create(@Payload() createLayerDto: Partial<LayerEntity>) {
    await this.parkService.findOne(Number(createLayerDto.park));

    return this.layerService.create(createLayerDto);
  }

  @GrpcMethod('LayerService', 'findAll')
  findAll() {
    return this.layerService.findAll();
  }

  @GrpcMethod('LayerService', 'findOne')
  findOne(@Payload() data: { id: number }) {
    return this.layerService.findOne(data.id);
  }

  @GrpcMethod('LayerService', 'update')
  async update(@Payload() data: { id: number; dto: Partial<LayerEntity> }) {
    await this.parkService.findOne(Number(data.dto.park));

    return this.layerService.update(data.id, data.dto);
  }

  @GrpcMethod('LayerService', 'remove')
  remove(@Payload() data: { id: number }) {
    return this.layerService.remove(data.id);
  }
}
