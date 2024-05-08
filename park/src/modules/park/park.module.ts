import { Module } from '@nestjs/common';
import { ParkService } from './park.service';
import { ParkController } from './park.controller';
import { ParkRepository } from './park.repository';
import { ParkEntity } from './entities/park.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ParkEntity])],
  controllers: [ParkController],
  providers: [ParkService, ParkRepository],
})
export class ParkModule {}
