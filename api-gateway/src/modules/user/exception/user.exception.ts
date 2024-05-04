import { RpcException } from '@nestjs/microservices';

export class UserNotFoundRpcException extends RpcException {
  constructor() {
    super('user not found_$_404');
  }
}

export class LoginOrPasswordWrong extends RpcException {
  constructor() {
    super('Login or Password wrong_$_400!');
  }
}

export class UserAlreadyException extends RpcException {
  constructor() {
    super('User already exist_$_400');
  }
}

export class UserPhoneAlreadyException extends RpcException {
  constructor() {
    super('User phone already exist_$_400');
  }
}
