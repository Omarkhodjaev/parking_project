import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTariffEntity } from './entities/user-tariff.entity';

export class UserTariffRepository {
  constructor(
    @InjectRepository(UserTariffEntity)
    private readonly userTariffRepository: Repository<UserTariffEntity>,
  ) {}

  async insert(entity: UserTariffEntity): Promise<UserTariffEntity> {
    return await this.userTariffRepository.save(entity);
  }

  async create(entity: UserTariffEntity): Promise<UserTariffEntity> {
    return this.userTariffRepository.create(entity);
  }

  async findAll(): Promise<Array<UserTariffEntity>> {
    return await this.userTariffRepository.find();
  }

  async findOneById(id: number): Promise<UserTariffEntity | null> {
    return await this.userTariffRepository.findOneBy({ id });
  }

  async update(entity: UserTariffEntity): Promise<UserTariffEntity> {
    return await this.userTariffRepository.save(entity);
  }

  async delete(entity: UserTariffEntity): Promise<UserTariffEntity> {
    return await this.userTariffRepository.remove(entity);
  }
}
