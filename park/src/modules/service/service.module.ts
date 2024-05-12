import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { ServiceRepository } from './service.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './entities/service.entity';
import { TariffRepository } from '../tariff/tariff.repository';
import { TariffEntity } from '../tariff/entities/tariff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity, TariffEntity])],
  controllers: [ServiceController],
  providers: [ServiceService, ServiceRepository, TariffRepository],
})
export class ServiceModule {}
