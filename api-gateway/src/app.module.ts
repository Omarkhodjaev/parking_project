import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { UserDetailModule } from './modules/user-detail/user-detail.module';
import { UserTariffModule } from './modules/user-tariff/user-tariff.module';
import { ParkModule } from './modules/park/park.module';
import { LayerModule } from './modules/layer/layer.module';
import { PlaceModule } from './modules/place/place.module';
import { TariffModule } from './modules/tariff/tariff.module';
import { ServiceModule } from './modules/service/service.module';

@Module({
  imports: [
    UserModule,
    UserDetailModule,
    UserTariffModule,
    ParkModule,
    LayerModule,
    PlaceModule,
    TariffModule,
    ServiceModule,
  ],
})
export class AppModule {}
