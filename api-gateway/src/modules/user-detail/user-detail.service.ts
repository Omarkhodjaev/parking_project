import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { UserDetailEntity } from './entities/user-detail.entity';
import { ResData } from 'src/lib/resData';
import { USER_PACKAGE } from 'src/common/const/microservices';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { Cache } from '@nestjs/cache-manager';
import { RedisKeys } from 'src/common/types/enums';

@Injectable()
export class UserDetailService {
  private userDetailService: any;

  constructor(
    @Inject(USER_PACKAGE) private Userclient: ClientGrpc,
    @Inject('CACHE_MANAGER')
    private cacheManager: Cache,
  ) {}

  onModuleInit() {
    this.userDetailService = this.Userclient.getService('UserDetailService');
  }

  async create(dto: CreateUserDetailDto) {
    await this.deleteDataInRedis(RedisKeys.ALL_USER_DETAILS);
    return await this.userDetailService.create({
      ...dto,
    });
  }

  async findAll() {
    return await this.userDetailService.findAll({});
  }

  async findOneById(id: number): Promise<ResData<UserDetailEntity>> {
    return await this.userDetailService.findOne({ id });
  }
  async update(
    id: number,
    dto: UpdateUserDetailDto,
  ): Promise<ResData<UserDetailEntity>> {
    await this.deleteDataInRedis(RedisKeys.ALL_USER_DETAILS);
    return await this.userDetailService.update({ id, dto });
  }

  async delete(id: number): Promise<ResData<UserDetailEntity>> {
    await this.deleteDataInRedis(RedisKeys.ALL_USER_DETAILS);

    return await this.userDetailService.remove({ id });
  }

  private async deleteDataInRedis(key: RedisKeys) {
    await this.cacheManager.del(key);
  }
}
