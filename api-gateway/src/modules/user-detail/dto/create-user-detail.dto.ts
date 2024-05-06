import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class CreateUserDetailDto {
  @ApiProperty({
    type: String,
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  avatar: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  user: number;
}
