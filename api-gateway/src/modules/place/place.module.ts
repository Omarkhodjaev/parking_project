import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
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
          package: 'place',
          protoPath: join(__dirname, '../../protos/place.proto'),
          url: config.parkServiceUrl,
        },
      },
    ]),
  ],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
