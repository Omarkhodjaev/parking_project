import { Inject, Injectable } from '@nestjs/common';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { PARK_PACKAGE } from 'src/common/const/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ParkService {
  private userService: any;

  constructor(@Inject(PARK_PACKAGE) private Parkclient: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.Parkclient.getService('ParkService');
  }

  async create(createParkDto: CreateParkDto) {
    return await this.userService.create(createParkDto);
  }

  async findAll() {
    return await this.userService.findAll({});
  }

  async findOne(id: number) {
    return await this.userService.findOne({ id });
  }

  async update(id: number, updateParkDto: Partial<UpdateParkDto>) {
    return await this.userService.update({ id, dto: updateParkDto });
  }

  async remove(id: number) {
    return await this.userService.remove({ id });
  }
}
