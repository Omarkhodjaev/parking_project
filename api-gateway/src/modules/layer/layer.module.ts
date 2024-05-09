import { Module } from '@nestjs/common';
import { LayerService } from './layer.service';
import { LayerController } from './layer.controller';
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
          package: 'layer',
          protoPath: join(__dirname, '../../protos/layer.proto'),
          url: config.parkServiceUrl,
        },
      },
    ]),
  ],
  controllers: [LayerController],
  providers: [LayerService],
})
export class LayerModule {}
