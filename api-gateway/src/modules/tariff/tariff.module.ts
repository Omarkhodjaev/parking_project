import { Module } from '@nestjs/common';
import { TariffService } from './tariff.service';
import { TariffController } from './tariff.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PARK_PACKAGE } from 'src/common/const/microservices';
import { join } from 'path';
import { config } from 'src/common/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PARK_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'tariff',
          protoPath: join(__dirname, '../../protos/tariff.proto'),
          url: config.parkServiceUrl,
        },
      },
    ]),
  ],
  controllers: [TariffController],
  providers: [TariffService],
})
export class TariffModule {}
