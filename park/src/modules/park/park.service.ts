import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { ParkRepository } from './park.repository';
import { ResData } from 'src/lib/resData';
import { ParkEntity } from './entities/park.entity';
import { ParkNotFoundRpcException } from './exception/park.exception';

@Injectable()
export class ParkService {
  constructor(private readonly parkRepository: ParkRepository) {}

  async create(createParkDto: Partial<CreateParkDto>) {
    const data = await this.parkRepository.insert(createParkDto);

    return new ResData(
      'Park was successfully created',
      HttpStatus.CREATED,
      data,
    );
  }

  async findAll() {
    const data = await this.parkRepository.findAll();

    return new ResData('Parks were successfully found', HttpStatus.OK, data);
  }

  async findOne(id: number) {
    const data = await this.parkRepository.findOneById(id);

    if (!data) {
      throw new ParkNotFoundRpcException();
    }

    return new ResData('Park was successfully found', HttpStatus.OK, data);
  }

  async update(id: number, updateParkDto: Partial<UpdateParkDto>) {
    const { data: foundPark } = await this.findOne(id);

    const updateData = Object.assign(foundPark, updateParkDto);

    const data = await this.parkRepository.update(updateData);
    return new ResData('Park was updated successfully', HttpStatus.OK, data);
  }

  async remove(id: number) {
    const { data: foundPark } = await this.findOne(id);
    await this.parkRepository.delete(foundPark);

    return new ResData(
      'Park was successfully removed',
      HttpStatus.OK,
      foundPark,
    );
  }
}
