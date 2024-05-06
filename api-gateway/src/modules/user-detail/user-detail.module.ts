import { Module } from '@nestjs/common';
import { UserDetailService } from './user-detail.service';
import { UserDetailController } from './user-detail.controller';
import { USER_PACKAGE } from 'src/common/const/microservices';
import { join } from 'path';
import { config } from 'src/common/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'userDetail',
          protoPath: join(__dirname, '../../protos/userDetail.proto'),
          url: config.userServiceUrl,
        },
      },
    ]),
  ],
  controllers: [UserDetailController],
  providers: [UserDetailService],
})
export class UserDetailModule {}
