import { Inject, Injectable } from '@nestjs/common';
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { PARK_PACKAGE } from 'src/common/const/microservices';
import { Cache } from '@nestjs/cache-manager';
import { RedisKeys } from 'src/common/types/enums';

@Injectable()
export class LayerService {
  private layerService: any;

  constructor(
    @Inject(PARK_PACKAGE) private Parkclient: ClientGrpc,
    @Inject('CACHE_MANAGER')
    private cacheManager: Cache,
  ) {}

  onModuleInit() {
    this.layerService = this.Parkclient.getService('LayerService');
  }

  async create(createLayerDto: CreateLayerDto) {
    await this.deleteDataInRedis(RedisKeys.ALL_LAYERS);

    return await this.layerService.create(createLayerDto);
  }

  async findAll() {
    return await this.layerService.findAll({});
  }

  async findOne(id: number) {
    return await this.layerService.findOne({ id });
  }

  async update(id: number, dto: UpdateLayerDto) {
    await this.deleteDataInRedis(RedisKeys.ALL_LAYERS);

    return await this.layerService.update({ id, dto });
  }

  async remove(id: number) {
    await this.deleteDataInRedis(RedisKeys.ALL_LAYERS);
    return await this.layerService.remove({ id });
  }

  async deleteDataInRedis(key: string) {
    await this.cacheManager.del(key);
  }
}
