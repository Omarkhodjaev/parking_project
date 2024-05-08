import { Module } from '@nestjs/common';
import { UserTariffService } from './user-tariff.service';
import { UserTariffController } from './user-tariff.controller';
import { UserTariffRepository } from './user-tariff.repository';
import { UserTariffEntity } from './entities/user-tariff.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTariffEntity, UserEntity])],
  controllers: [UserTariffController],
  providers: [
    UserTariffService,
    UserTariffRepository,
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserRepository', useClass: UserRepository },
  ],
})
export class UserTariffModule {}
