import { IConfig } from './interfaces/config.interface';

import * as dotenv from 'dotenv';
dotenv.config();

export const config: IConfig = {
  serverPort: process.env.SERVER_PORT,
  dbUrl: process.env.DB_URL,
  jwtKey: process.env.JWT_KEY,
  jwtExpiredIn: process.env.JWT_EXPIRED_IN,
};
