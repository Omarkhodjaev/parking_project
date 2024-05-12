import { RpcException } from '@nestjs/microservices';

export class ServiceNotFoundRpcException extends RpcException {
  statusCode: number;
  constructor() {
    super('Place not found_$_404');
  }
}


