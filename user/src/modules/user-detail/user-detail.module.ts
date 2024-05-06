import { Module } from '@nestjs/common';
import { UserDetailService } from './user-detail.service';
import { UserDetailController } from './user-detail.controller';
import { UserDetailRepository } from './user-detail.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetailEntity } from './entities/user-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserDetailEntity])],
  controllers: [UserDetailController],
  providers: [
    { provide: 'IUserDetailService', useClass: UserDetailService },
    { provide: 'IUserDetailRepository', useClass: UserDetailRepository },
  ],
})
export class UserDetailModule {}
