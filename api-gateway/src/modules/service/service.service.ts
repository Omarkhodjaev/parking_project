import { Inject, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PARK_PACKAGE, USER_PACKAGE } from 'src/common/const/microservices';
import { ClientGrpc } from '@nestjs/microservices';
import { Cache } from '@nestjs/cache-manager';
import { RedisKeys } from 'src/common/types/enums';

@Injectable()
export class ServiceService {
  private serviceService: any;

  constructor(
    @Inject(PARK_PACKAGE) private Parkclient: ClientGrpc,

    @Inject('CACHE_MANAGER')
    private cacheManager: Cache,
  ) {}

  onModuleInit() {
    this.serviceService = this.Parkclient.getService('ServiceService');
  }

  async create(createServiceDto: CreateServiceDto) {
    await this.deleteDataInRedis(RedisKeys.ALL_SERVICES);
    return await this.serviceService.create(createServiceDto);
  }

  async findAll() {
    return await this.serviceService.findAll({});
  }

  async findOne(id: number) {
    return await this.serviceService.findOne({ id });
  }

  async remove(id: number) {
    await this.deleteDataInRedis(RedisKeys.ALL_SERVICES);

    return await this.serviceService.remove({ id });
  }

  private async deleteDataInRedis(key: RedisKeys) {
    await this.cacheManager.del(key);
  }
}
