import { Module } from '@nestjs/common';
import { LayerService } from './layer.service';
import { LayerController } from './layer.controller';
import { LayerRepository } from './layer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LayerEntity } from './entities/layer.entity';
import { ParkService } from '../park/park.service';
import { ParkRepository } from '../park/park.repository';
import { ParkEntity } from '../park/entities/park.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LayerEntity, ParkEntity])],
  controllers: [LayerController],     
  providers: [LayerService, LayerRepository, ParkService, ParkRepository],
})
export class LayerModule {}
