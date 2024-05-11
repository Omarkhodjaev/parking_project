import { RpcException } from '@nestjs/microservices';

export class TariffNotFoundRpcException extends RpcException {
  statusCode: number;
  constructor() {
    super('Tariff not found_$_404');
  }
}

export class TariffAlreadyExistException extends RpcException {
  constructor() {
    super('Tariff already exist_$_400');
  }
}
