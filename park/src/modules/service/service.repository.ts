import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceEntity } from './entities/service.entity';

export class ServiceRepository {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
  ) {}

  async insert(entity: Partial<ServiceEntity>): Promise<ServiceEntity> {
    const newEntity = this.serviceRepository.create(entity);
    return await this.serviceRepository.save(newEntity);
  }

  async findAll(): Promise<Array<ServiceEntity>> {
    return await this.serviceRepository.find();
  }

  async findOneById(id: number): Promise<ServiceEntity | null> {
    return await this.serviceRepository.findOneBy({ id });
  }

  async delete(entity: ServiceEntity): Promise<ServiceEntity> {
    return await this.serviceRepository.remove(entity);
  }
}
