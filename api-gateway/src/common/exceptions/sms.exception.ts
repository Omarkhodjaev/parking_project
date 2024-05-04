import { HttpException } from '@nestjs/common';

export class SmsNotSendException extends HttpException {
  constructor(message: string) {
    super('sms was not sended ' + message, 500);
  }
}
