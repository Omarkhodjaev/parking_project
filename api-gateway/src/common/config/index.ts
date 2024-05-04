import { IConfig } from './interfaces/config.interface';

import * as dotenv from 'dotenv';
dotenv.config();

export const config: IConfig = {
  serverPort: Number(process.env.SERVER_PORT),
  userServiceUrl: String(process.env.USER_SERVICE_URL),
  parkServiceUrl: String(process.env.PARK_SERVICE_URL),
  transactionServiceUrl: String(process.env.TRANSACTION_SERVICE_URL),
  jwtKey: String(process.env.JWT_KEy),
  jwtExpiredIn: String(process.env.JWT_EXPIRED_IN),
};
