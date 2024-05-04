import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    example: '+998997888778',
  })
  @Length(13, 13)
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: String,
    example: 'test',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
