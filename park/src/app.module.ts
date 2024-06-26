import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './common/config';
import { ParkModule } from './modules/park/park.module';
import { ParkEntity } from './modules/park/entities/park.entity';
import { LayerModule } from './modules/layer/layer.module';
import { LayerEntity } from './modules/layer/entities/layer.entity';
import { PlaceModule } from './modules/place/place.module';
import { PlaceEntity } from './modules/place/entities/place.entity';
import { TariffModule } from './modules/tariff/tariff.module';
import { TariffEntity } from './modules/tariff/entities/tariff.entity';
import { ServiceModule } from './modules/service/service.module';
import { ServiceEntity } from './modules/service/entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.dbUrl,
      entities: [
        ParkEntity,
        LayerEntity,
        PlaceEntity,
        TariffEntity,
        ServiceEntity,
      ],
      synchronize: false,
    }),

    ParkModule,
    LayerModule,
    PlaceModule,
    TariffModule,
    ServiceModule,
  ],
})
export class AppModule {}
