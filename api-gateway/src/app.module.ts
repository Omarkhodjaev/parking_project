import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { UserDetailModule } from './modules/user-detail/user-detail.module';
import { UserTariffModule } from './modules/user-tariff/user-tariff.module';
import { ParkModule } from './modules/park/park.module';

@Module({
  imports: [UserModule, UserDetailModule, UserTariffModule, ParkModule],
})
export class AppModule {}
