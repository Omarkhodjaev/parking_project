import { Module } from '@nestjs/common';
import { UserTariffService } from './user-tariff.service';
import { UserTariffController } from './user-tariff.controller';

@Module({
  controllers: [UserTariffController],
  providers: [UserTariffService],
})
export class UserTariffModule {}
