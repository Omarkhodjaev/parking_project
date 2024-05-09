import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLayerDto {
  @ApiProperty({ type: String, example: 'test' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  @IsNumber()
  floor: number;

  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  @IsNumber()
  park: number;
}
