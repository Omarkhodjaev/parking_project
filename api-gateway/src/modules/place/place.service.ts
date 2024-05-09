import { Inject, Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PARK_PACKAGE } from 'src/common/const/microservices';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class PlaceService {
  private parkService: any;

  constructor(@Inject(PARK_PACKAGE) private Parkclient: ClientGrpc) {}

  onModuleInit() {
    this.parkService = this.Parkclient.getService('PlaceService');
  }

  async create(createPlaceDto: CreatePlaceDto) {
    return await this.parkService.create(createPlaceDto);
  }

  async findAll() {
    return await this.parkService.findAll({});
  }

  async findOne(id: number) {
    return await this.parkService.findOne({ id });
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto) {
    return await this.parkService.update({ id, dto: updatePlaceDto });
  }

  async remove(id: number) {
    return await this.parkService.remove({ id });
  }
}
