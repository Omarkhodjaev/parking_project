import { RpcException } from '@nestjs/microservices';

export class UserDetailNotFoundRpcException extends RpcException {
  statusCode: number;
  constructor() {
    super('userDetail not found_$_404');
  }
}

export class UserDetailAlreadyException extends RpcException {
  constructor() {
    super('userDetail already exist_$_400');
  }
}
