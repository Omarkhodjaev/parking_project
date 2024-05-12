import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { ServiceService } from './service.service';
import { ServiceEntity } from './entities/service.entity';

@Controller()
export class ServiceController {
  constructor(private readonly ServiceService: ServiceService) {}

  @GrpcMethod('ServiceService', 'create')
  async create(@Payload() createServiceDto: Partial<ServiceEntity>) {
    
    return this.ServiceService.create(createServiceDto);
  }

  @GrpcMethod('ServiceService', 'findAll')
  async findAll() {
    console.log(await this.ServiceService.findAll());
    
    return this.ServiceService.findAll();
  }

  @GrpcMethod('ServiceService', 'findOne')
  findOne(@Payload() data: { id: number }) {
    return this.ServiceService.findOne(data.id);
  }

  @GrpcMethod('ServiceService', 'remove')
  remove(@Payload() data: { id: number }) {
    return this.ServiceService.remove(data.id);
  }
}
