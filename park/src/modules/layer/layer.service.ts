import { HttpStatus, Injectable } from '@nestjs/common';
import { ResData } from 'src/lib/resData';
import { LayerNotFoundRpcException } from './exception/layer.exception';
import { LayerRepository } from './layer.repository';
import { LayerEntity } from './entities/layer.entity';

@Injectable()
export class LayerService {
  constructor(private readonly layerRepository: LayerRepository) {}

  async create(createLayerDto: Partial<LayerEntity>) {
    const data = await this.layerRepository.insert(createLayerDto);

    return new ResData(
      'Layer was successfully created',
      HttpStatus.CREATED,
      data,
    );
  }

  async findAll() {
    const data = await this.layerRepository.findAll();

    return new ResData('Layers were successfully found', HttpStatus.OK, data);
  }

  async findOne(id: number) {
    const data = await this.layerRepository.findOneById(id);

    if (!data) {
      throw new LayerNotFoundRpcException();
    }

    return new ResData('Layer was successfully found', HttpStatus.OK, data);
  }

  async update(id: number, updateLayerDto: Partial<LayerEntity>) {
    const { data: foundLayer } = await this.findOne(id);

    const updateData = Object.assign(foundLayer, updateLayerDto);

    const data = await this.layerRepository.update(updateData);
    return new ResData('Layer was updated successfully', HttpStatus.OK, data);
  }

  async remove(id: number) {
    const { data: foundLayer } = await this.findOne(id);
    await this.layerRepository.delete(foundLayer);

    return new ResData(
      'Layer was successfully removed',
      HttpStatus.OK,
      foundLayer,
    );
  }
}
