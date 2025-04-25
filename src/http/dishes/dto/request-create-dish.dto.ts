import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

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

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  prepTime: string | null;

  @IsString()
  @ApiProperty()
  flagged: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  description: string | null;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  sectionId: string;
}
