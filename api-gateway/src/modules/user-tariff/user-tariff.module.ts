import { Module } from '@nestjs/common';
import { UserTariffService } from './user-tariff.service';
import { UserTariffController } from './user-tariff.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_PACKAGE } from 'src/common/const/microservices';
import { join } from 'path';
import { config } from 'src/common/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'userTariff',
          protoPath: join(__dirname, '../../protos/userTariff.proto'),
          url: config.userServiceUrl,
        },
      },
    ]),
  ],
  controllers: [UserTariffController],
  providers: [UserTariffService],
})
export class UserTariffModule {}
