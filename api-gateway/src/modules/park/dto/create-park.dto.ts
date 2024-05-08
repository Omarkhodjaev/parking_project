import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateParkDto {
  @ApiProperty({ type: String, example: 'John' })
  @IsString()
  name: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  owner: number;

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  image: number;
}
