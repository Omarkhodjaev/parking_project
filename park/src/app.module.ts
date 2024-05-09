import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './common/config';
import { ParkModule } from './modules/park/park.module';
import { ParkEntity } from './modules/park/entities/park.entity';
import { LayerModule } from './modules/layer/layer.module';
import { LayerEntity } from './modules/layer/entities/layer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.dbUrl,
      entities: [ParkEntity, LayerEntity],
      synchronize: false,
    }),

    ParkModule,
    LayerModule,
  ],
})
export class AppModule {}
