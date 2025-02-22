import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}
