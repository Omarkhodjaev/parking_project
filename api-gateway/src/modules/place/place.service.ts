import { Inject, Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PARK_PACKAGE } from 'src/common/const/microservices';
import { ClientGrpc } from '@nestjs/microservices';
import { Cache } from '@nestjs/cache-manager';
import { RedisKeys } from 'src/common/types/enums';

@Injectable()
export class PlaceService {
  private parkService: any;

  constructor(
    @Inject(PARK_PACKAGE) private Parkclient: ClientGrpc,
    @Inject('CACHE_MANAGER')
    private cacheManager: Cache,
  ) {}

  onModuleInit() {
    this.parkService = this.Parkclient.getService('PlaceService');
  }

  async create(createPlaceDto: CreatePlaceDto) {
    await this.deleteDataInRedis(RedisKeys.ALL_PARK_PLACES);

    return await this.parkService.create(createPlaceDto);
  }

  async findAll() {
    return await this.parkService.findAll({});
  }

  async findOne(id: number) {
    return await this.parkService.findOne({ id });
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto) {
    await this.deleteDataInRedis(RedisKeys.ALL_PARK_PLACES);

    return await this.parkService.update({ id, dto: updatePlaceDto });
  }

  async remove(id: number) {
    await this.deleteDataInRedis(RedisKeys.ALL_PARK_PLACES);

    return await this.parkService.remove({ id });
  }

  private async deleteDataInRedis(key: RedisKeys) {
    await this.cacheManager.del(key);
  }
}
