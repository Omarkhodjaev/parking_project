import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { UserTariffModule } from './modules/user-tariff/user-tariff.module';
import { UserDetailModule } from './modules/user-detail/user-detail.module';

@Module({
  imports: [UserModule, UserTariffModule, UserDetailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
