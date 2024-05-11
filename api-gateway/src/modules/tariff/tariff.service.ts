import { Inject, Injectable } from '@nestjs/common';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { PARK_PACKAGE } from 'src/common/const/microservices';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class TariffService {
  private tariffService: any;

  constructor(@Inject(PARK_PACKAGE) private Parkclient: ClientGrpc) {}

  onModuleInit() {
    this.tariffService = this.Parkclient.getService('TariffService');
  }

  async create(createTariffDto: CreateTariffDto) {
    return await this.tariffService.create(createTariffDto);
  }

  async findAll() {
    return await this.tariffService.findAll({});
  }

  async findOne(id: number) {
    return await this.tariffService.findOne({ id });
  }

  async update(id: number, updateTariffDto: UpdateTariffDto) {
    return await this.tariffService.update({ id, dto: updateTariffDto });
  }

  async remove(id: number) {
    return await this.tariffService.remove({ id });
  }
}
