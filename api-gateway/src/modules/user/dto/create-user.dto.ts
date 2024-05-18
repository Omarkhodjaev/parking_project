import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { RoleEnum } from '../../../common/types/enums';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: '+998991234545',
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

  @ApiProperty({
    enum: RoleEnum,
    example: RoleEnum.Client,
  })
  @IsEnum(RoleEnum)
  @IsNotEmpty()
  role: RoleEnum;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  parkId: number;
}
