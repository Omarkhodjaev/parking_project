import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkEntity } from './entities/park.entity';
import { CreateParkDto } from './dto/create-park.dto';

export class ParkRepository {
  constructor(
    @InjectRepository(ParkEntity)
    private readonly parkRepository: Repository<ParkEntity>,
  ) {}

  async insert(entity: Partial<CreateParkDto>): Promise<ParkEntity> {
    const newPark = this.parkRepository.create(entity);
    const park = await this.parkRepository.save(newPark);
    return park;
  }

  async findAll(): Promise<Array<ParkEntity>> {
    return await this.parkRepository.find();
  }

  async findOneById(id: number ): Promise<ParkEntity | null> {

    return await this.parkRepository.findOneBy({ id });
  }

  async update(entity: ParkEntity): Promise<ParkEntity> {
    
    return await this.parkRepository.save(entity);
  }

  async delete(entity: ParkEntity): Promise<ParkEntity> {
    return await this.parkRepository.remove(entity);
  }
}
