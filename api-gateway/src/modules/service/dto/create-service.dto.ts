import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  park: number;

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  user: number;

  @ApiProperty({ type: Number, example: 10 })
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  @IsOptional()
  tariff: number;

  @ApiProperty({ type: Date })
  @IsDateString()
  @IsNotEmpty()
  startedAt: Date;

  @ApiProperty({ type: Date })
  @IsDateString()
  @IsNotEmpty()
  endedAt: Date;
}
