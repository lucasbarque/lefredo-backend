import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RequestCreateDishesFlavorsDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  label: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  price: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  description: string;
}
