import { IConfig } from './interfaces/config.interface';

import * as dotenv from 'dotenv';
dotenv.config();

export const config: IConfig = {
  serverPort: process.env.SERVER_PORT,
  dbUrl: process.env.DB_URL,
};
