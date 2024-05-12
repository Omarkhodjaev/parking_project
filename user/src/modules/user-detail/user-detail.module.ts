import { Module } from '@nestjs/common';
import { UserDetailService } from './user-detail.service';
import { UserDetailController } from './user-detail.controller';
import { UserDetailRepository } from './user-detail.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetailEntity } from './entities/user-detail.entity';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserDetailEntity, UserEntity])],
  controllers: [UserDetailController],
  providers: [
    { provide: 'IUserDetailService', useClass: UserDetailService },
    { provide: 'IUserDetailRepository', useClass: UserDetailRepository },
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserRepository', useClass: UserRepository },
  ],
})
export class UserDetailModule {}
