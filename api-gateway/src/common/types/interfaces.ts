import { Request } from 'express';
import { RoleEnum } from './enums';

export interface IRequest extends Request {
  user: ICurrentUser;
}

export interface ICurrentUser {
  id: number;
  role: RoleEnum;
  phone: string;
}
