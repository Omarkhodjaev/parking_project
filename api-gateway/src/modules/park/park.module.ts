import { Module } from '@nestjs/common';
import { ParkService } from './park.service';
import { ParkController } from './park.controller';
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
          package: 'park',
          protoPath: join(__dirname, '../../protos/park.proto'),
          url: config.parkServiceUrl,
        },
      },
    ]),
  ],
  controllers: [ParkController],
  providers: [ParkService],
})
export class ParkModule {}
