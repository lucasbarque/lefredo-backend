import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RequestUpdateDishDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  portion: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  price: string;

  @IsNumber()
  prepTime: number;

  @IsString()
  @ApiProperty()
  flagged: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  description: string;
}
