import { Module } from '@nestjs/common';
import { TariffService } from './tariff.service';
import { TariffController } from './tariff.controller';
import { TariffRepository } from './tariff.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TariffEntity } from './entities/tariff.entity';
import { ParkService } from '../park/park.service';
import { ParkRepository } from '../park/park.repository';
import { ParkEntity } from '../park/entities/park.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TariffEntity, ParkEntity])],
  controllers: [TariffController],
  providers: [TariffService, TariffRepository, ParkService, ParkRepository],
})
export class TariffModule {}
