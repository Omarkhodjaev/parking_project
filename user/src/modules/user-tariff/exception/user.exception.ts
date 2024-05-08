import { RpcException } from '@nestjs/microservices';

export class UserTariffNotFoundRpcException extends RpcException {
  statusCode: number;
  constructor() {
    super('userTariff not found_$_404');
  }
}
