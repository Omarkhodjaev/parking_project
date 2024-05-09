import { HttpStatus, Injectable } from '@nestjs/common';
import { ResData } from 'src/lib/resData';
import { PlaceEntity } from './entities/place.entity';
import { PlaceRepository } from './place.repository';
import { PlaceNotFoundRpcException } from './exception/layer.exception';

@Injectable()
export class PlaceService {
  constructor(private readonly layerRepository: PlaceRepository) {}

  async create(createPlaceDto: Partial<PlaceEntity>) {
    const data = await this.layerRepository.insert(createPlaceDto);

    return new ResData(
      'Place was successfully created',
      HttpStatus.CREATED,
      data,
    );
  }

  async findAll() {
    const data = await this.layerRepository.findAll();

    return new ResData('Places were successfully found', HttpStatus.OK, data);
  }

  async findOne(id: number) {
    const data = await this.layerRepository.findOneById(id);

    if (!data) {
      throw new PlaceNotFoundRpcException();
    }

    return new ResData('Place was successfully found', HttpStatus.OK, data);
  }

  async update(id: number, updatePlaceDto: Partial<PlaceEntity>) {
    const { data: foundPlace } = await this.findOne(id);

    const updateData = Object.assign(foundPlace, updatePlaceDto);

    const data = await this.layerRepository.update(updateData);
    return new ResData('Place was updated successfully', HttpStatus.OK, data);
  }

  async remove(id: number) {
    const { data: foundPlace } = await this.findOne(id);
    await this.layerRepository.delete(foundPlace);

    return new ResData(
      'Place was successfully removed',
      HttpStatus.OK,
      foundPlace,
    );
  }
}
