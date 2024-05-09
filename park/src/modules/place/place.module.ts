import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { PlaceRepository } from './place.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceEntity } from './entities/place.entity';
import { LayerService } from '../layer/layer.service';
import { LayerEntity } from '../layer/entities/layer.entity';
import { LayerRepository } from '../layer/layer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceEntity,LayerEntity])],
  controllers: [PlaceController],
  providers: [PlaceService, PlaceRepository,LayerService,LayerRepository],
})
export class PlaceModule {}
