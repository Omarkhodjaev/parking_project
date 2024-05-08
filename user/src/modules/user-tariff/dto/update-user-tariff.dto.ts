import { PartialType } from '@nestjs/mapped-types';
import { CreateUserTariffDto } from './create-user-tariff.dto';

export class UpdateUserTariffDto extends CreateUserTariffDto {
  id: number;
}
