import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RequestUpdateDishesFlavorsDTO {
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
  price: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  description: string | null;
}
