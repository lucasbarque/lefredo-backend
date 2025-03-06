import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
  @ApiProperty({ nullable: true })
  price: string | null;

  @IsString()
  @ApiProperty()
  description: string | null;
}
