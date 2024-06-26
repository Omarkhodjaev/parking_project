import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_PACKAGE } from 'src/common/const/microservices';
import { join } from 'path';
import { config } from 'src/common/config';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, '../../protos/user.proto'),
          url: config.userServiceUrl,
        },
      },
    ]),
    JwtModule.register({
      global: true,
      secret: config.jwtKey,
      signOptions: { expiresIn: config.jwtExpiredIn },
    }),
    SharedModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
