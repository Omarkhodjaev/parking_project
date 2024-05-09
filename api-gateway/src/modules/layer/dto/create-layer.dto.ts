import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLayerDto {
  @ApiProperty({ type: String, example: 'test' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsOptional()
  @IsNumber()
  floor: number;

  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  @IsNumber()
  park: number;
}
