import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserTariffDto {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  user: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  tariff: number;

  @ApiProperty({
    type: Date,
  })
  @IsString()
  @IsNotEmpty()
  startedAt: Date;

  @ApiProperty({
    type: Date,
  })
  @IsString()
  @IsNotEmpty()
  endedAt: Date;
}
