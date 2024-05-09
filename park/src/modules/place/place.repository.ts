import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaceEntity } from './entities/place.entity';

export class PlaceRepository {
  constructor(
    @InjectRepository(PlaceEntity)
    private readonly placeRepository: Repository<PlaceEntity>,
  ) {}

  async insert(entity: Partial<PlaceEntity>): Promise<PlaceEntity> {
    const newPlace = this.placeRepository.create(entity);
    const place = await this.placeRepository.save(newPlace);
    return place;
  }

  async findAll(): Promise<Array<PlaceEntity>> {
    return await this.placeRepository.find({ relations: ['layer'] });
  }

  async findOneById(id: number): Promise<PlaceEntity | null> {
    return await this.placeRepository.findOneBy({ id });
  }

  async update(entity: PlaceEntity): Promise<PlaceEntity> {
    return await this.placeRepository.save(entity);
  }

  async delete(entity: PlaceEntity): Promise<PlaceEntity> {
    return await this.placeRepository.remove(entity);
  }
}
