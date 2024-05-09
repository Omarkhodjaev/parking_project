import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlaceDto {
  @ApiProperty({ type: String, example: 'test' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  layer: number;

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
