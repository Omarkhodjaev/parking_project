import { RpcException } from '@nestjs/microservices';

export class PlaceNotFoundRpcException extends RpcException {
  statusCode: number;
  constructor() {
    super('Place not found_$_404');
  }
}

export class PlaceAlreadyExistException extends RpcException {
  constructor() {
    super('Place already exist_$_400');
  }
}
