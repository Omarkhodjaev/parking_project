export interface IConfig {
  serverPort: number;
  userServiceUrl: string;
  parkServiceUrl: string;
  transactionServiceUrl: string;
  jwtKey: string;
  jwtExpiredIn: string;
}
