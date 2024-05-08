import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './common/config';
import { ParkModule } from './modules/park/park.module';
import { ParkEntity } from './modules/park/entities/park.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.dbUrl,
      entities: [ParkEntity],
      synchronize: false,
    }),

    ParkModule,
  ],
})
export class AppModule {}
