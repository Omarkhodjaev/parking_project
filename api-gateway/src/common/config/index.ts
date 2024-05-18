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
  redisHost: String(process.env.REDIS_HOST),
  redisPort: Number(process.env.REDIS_PORT),
  saltOrRound: Number(process.env.SALT_OR_ROUND_KEY),
};
