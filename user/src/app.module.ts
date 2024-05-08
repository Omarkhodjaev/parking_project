import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { UserTariffModule } from './modules/user-tariff/user-tariff.module';
import { UserDetailModule } from './modules/user-detail/user-detail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './common/config';
import { UserEntity } from './modules/user/entities/user.entity';
import { UserDetailEntity } from './modules/user-detail/entities/user-detail.entity';
import { UserTariffEntity } from './modules/user-tariff/entities/user-tariff.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.dbUrl,
      entities: [UserEntity, UserDetailEntity, UserTariffEntity],
      synchronize: false,
    }),

    UserModule,
    UserTariffModule,
    UserDetailModule,
  ],
})
export class AppModule {}
