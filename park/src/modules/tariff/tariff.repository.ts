import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TariffEntity } from './entities/tariff.entity';

export class TariffRepository {
  constructor(
    @InjectRepository(TariffEntity)
    private readonly tariffRepository: Repository<TariffEntity>,
  ) {}

  async insert(entity: Partial<TariffEntity>): Promise<TariffEntity> {
    return await this.tariffRepository.save(entity);
  }

  async findAll(): Promise<Array<TariffEntity>> {
    return await this.tariffRepository.find();
  }

  async findOneById(id: number): Promise<TariffEntity | null> {
    return await this.tariffRepository.findOneBy({ id });
  }

  async update(entity: TariffEntity): Promise<TariffEntity> {
    return await this.tariffRepository.save(entity);
  }

  async delete(entity: TariffEntity): Promise<TariffEntity> {
    return await this.tariffRepository.remove(entity);
  }
}
