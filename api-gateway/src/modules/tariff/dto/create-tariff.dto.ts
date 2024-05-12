import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTariffDto {
  @ApiProperty({ type: String, example: 'test' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  @IsOptional()
  park: number;

  @ApiProperty({ type: Number, example: 100 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ type: String })
  @IsDate()
  @IsNotEmpty()
  time: Date;
}
