import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { UserDetailEntity } from './entities/user-detail.entity';
import { ResData } from 'src/lib/resData';
import { USER_PACKAGE } from 'src/common/const/microservices';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';

@Injectable()
export class UserDetailService {
  private userDetailService: any;

  constructor(@Inject(USER_PACKAGE) private Userclient: ClientGrpc) {}

  onModuleInit() {
    this.userDetailService = this.Userclient.getService('UserDetailService');
  }

  async create(dto: CreateUserDetailDto) {  
      
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
    return await this.userDetailService.update({ id, dto });
  }

  async delete(id: number): Promise<ResData<UserDetailEntity>> {
    return await this.userDetailService.remove({ id });
  }
}
