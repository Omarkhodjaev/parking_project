import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { ParkService } from './park.service';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';

@Controller()
export class ParkController {
  constructor(private readonly parkService: ParkService) {}

  @GrpcMethod('ParkService', 'create')
  create(@Payload() createParkDto: CreateParkDto) {
    return this.parkService.create(createParkDto);
  }

  @GrpcMethod('ParkService', 'findAll')
  findAll() {
    return this.parkService.findAll();
  }

  @GrpcMethod('ParkService', 'findOne')
  findOne(@Payload() data: { id: number }) {
    return this.parkService.findOne(data.id);
  }

  @GrpcMethod('ParkService', 'update')
  update(@Payload() data: { dto: Partial<UpdateParkDto>; id: number }) {
    
    return this.parkService.update(data.id, data.dto);
  }

  @GrpcMethod('ParkService', 'remove')
  remove(@Payload() data: { id: number }) {
    return this.parkService.remove(data.id);
  }
}
