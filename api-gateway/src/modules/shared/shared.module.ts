import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_SERVICE } from '../../common/const/servers';
import { config } from '../../common/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guards/auth/jwtStrategy';
import { join } from 'path';
import { USER_PACKAGE } from 'src/common/const/microservices';

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
      secret: config.jwtKey,
      signOptions: { expiresIn: config.jwtExpiredIn },
    }),
  ],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
})
export class SharedModule {}
