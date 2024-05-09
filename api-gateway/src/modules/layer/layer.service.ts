import { Inject, Injectable } from '@nestjs/common';
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { PARK_PACKAGE } from 'src/common/const/microservices';

@Injectable()
export class LayerService {
  private layerService: any;

  constructor(@Inject(PARK_PACKAGE) private Parkclient: ClientGrpc) {}

  onModuleInit() {
    this.layerService = this.Parkclient.getService('LayerService');
  }

  async create(createLayerDto: CreateLayerDto) {
    return await this.layerService.create(createLayerDto);
  }

  async findAll() {
    return await this.layerService.findAll({});
  }

  async findOne(id: number) {
    return await this.layerService.findOne({ id });
  }

  async update(id: number, dto: UpdateLayerDto) {
    return await this.layerService.update({ id, dto });
  }

  async remove(id: number) {
    return await this.layerService.remove({ id });
  }
}
