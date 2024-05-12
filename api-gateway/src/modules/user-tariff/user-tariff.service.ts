import { Inject, Injectable } from '@nestjs/common';
import { CreateUserTariffDto } from './dto/create-user-tariff.dto';
import { UpdateUserTariffDto } from './dto/update-user-tariff.dto';
import { USER_PACKAGE } from 'src/common/const/microservices';
import { ClientGrpc } from '@nestjs/microservices';
import { ResData } from 'src/lib/resData';
import { UserTariffEntity } from './entities/user-tariff.entity';
import { log } from '@grpc/grpc-js/build/src/logging';
import { Cache } from '@nestjs/cache-manager';
import { RedisKeys } from 'src/common/types/enums';

@Injectable()
export class UserTariffService {
  private userTariffService: any;

  constructor(
    @Inject(USER_PACKAGE)
    private Userclient: ClientGrpc,
    @Inject('CACHE_MANAGER')
    private cacheManager: Cache,
  ) {}

  onModuleInit() {
    this.userTariffService = this.Userclient.getService('UserTariffService');
  }

  async create(dto: CreateUserTariffDto) {
    await this.deleteDataInRedis(RedisKeys.ALL_USER_TARIFFS);
    return await this.userTariffService.create({
      ...dto,
    });
  }

  async findAll() {
    return await this.userTariffService.findAll({});
  }

  async findOneById(id: number): Promise<ResData<UserTariffEntity>> {
    return await this.userTariffService.findOne({ id });
  }
  async update(
    id: number,
    dto: UpdateUserTariffDto,
  ): Promise<ResData<UserTariffEntity>> {
    await this.deleteDataInRedis(RedisKeys.ALL_USER_TARIFFS);
    return await this.userTariffService.update({ id, dto });
  }

  async delete(id: number): Promise<ResData<UserTariffEntity>> {
    await this.deleteDataInRedis(RedisKeys.ALL_USER_TARIFFS);

    return await this.userTariffService.remove({ id });
  }

  private async deleteDataInRedis(key: RedisKeys) {
    await this.cacheManager.del(key);
  }
}
