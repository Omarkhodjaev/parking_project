import { DataSource, DataSourceOptions } from 'typeorm';

export const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  url: 'postgres://postgres:2004@localhost:5432/parking',
  entities: [__dirname + '/../../modules/**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
  synchronize: false,
};

export default new DataSource(typeormConfig);
