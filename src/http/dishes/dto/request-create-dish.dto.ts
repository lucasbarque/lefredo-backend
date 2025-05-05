import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class RequestCreateDishDTO {
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
  @ApiProperty({ type: Number })
  prepTime: number;

  @IsString()
  @ApiProperty()
  flagged: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  description: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  sectionId: string;
}
