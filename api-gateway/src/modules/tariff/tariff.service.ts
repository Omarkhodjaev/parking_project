import { Inject, Injectable } from '@nestjs/common';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { PARK_PACKAGE } from 'src/common/const/microservices';
import { ClientGrpc } from '@nestjs/microservices';
import { RedisKeys } from 'src/common/types/enums';
import { Cache } from '@nestjs/cache-manager';

@Injectable()
export class TariffService {
  private tariffService: any;

  constructor(
    @Inject(PARK_PACKAGE) private Parkclient: ClientGrpc,
    @Inject('CACHE_MANAGER')
    private cacheManager: Cache,
  ) {}

  onModuleInit() {
    this.tariffService = this.Parkclient.getService('TariffService');
  }

  async create(createTariffDto: CreateTariffDto) {
    await this.deleteDataInRedis(RedisKeys.ALL_PARK_TARIFFS);

    return await this.tariffService.create(createTariffDto);
  }

  async findAll() {
    return await this.tariffService.findAll({});
  }

  async findOne(id: number) {
    return await this.tariffService.findOne({ id });
  }

  async update(id: number, updateTariffDto: UpdateTariffDto) {
    await this.deleteDataInRedis(RedisKeys.ALL_PARK_TARIFFS);

    return await this.tariffService.update({ id, dto: updateTariffDto });
  }

  async remove(id: number) {
    await this.deleteDataInRedis(RedisKeys.ALL_PARK_TARIFFS);
    return await this.tariffService.remove({ id });
  }

  private async deleteDataInRedis(key: RedisKeys) {
    await this.cacheManager.del(key);
  }
}
