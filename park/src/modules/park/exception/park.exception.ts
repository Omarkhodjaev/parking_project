import { RpcException } from '@nestjs/microservices';

export class ParkNotFoundRpcException extends RpcException {
  statusCode: number;
  constructor() {
    super('user not found_$_404');
  }
}

export class ParkAlreadyExistException extends RpcException {
  constructor() {
    super('Park already exist_$_400');
  }
}
