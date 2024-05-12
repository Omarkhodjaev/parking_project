import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../types/enums';
import { ROLES_KEY } from '../const/servers';

export const RoleDecorator = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);
 