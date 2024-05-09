import { RpcException } from '@nestjs/microservices';

export class LayerNotFoundRpcException extends RpcException {
  statusCode: number;
  constructor() {
    super('Layer not found_$_404');
  }
}

export class LayerAlreadyExistException extends RpcException {
  constructor() {
    super('Layer already exist_$_400');
  }
}
