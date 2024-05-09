import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LayerEntity } from './entities/layer.entity';

export class LayerRepository {
  constructor(
    @InjectRepository(LayerEntity)
    private readonly parkRepository: Repository<LayerEntity>,
  ) {}

  async insert(entity: Partial<LayerEntity>): Promise<LayerEntity> {
    const newLayer = this.parkRepository.create(entity);
    const park = await this.parkRepository.save(newLayer);
    return park;
  }

  async findAll(): Promise<Array<LayerEntity>> {
    return await this.parkRepository.find({ relations: ['park'] });
  }

  async findOneById(id: number): Promise<LayerEntity | null> {
    return await this.parkRepository.findOneBy({ id });
  }

  async update(entity: LayerEntity): Promise<LayerEntity> {
    return await this.parkRepository.save(entity);
  }

  async delete(entity: LayerEntity): Promise<LayerEntity> {
    return await this.parkRepository.remove(entity);
  }
}
