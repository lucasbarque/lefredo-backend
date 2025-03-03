import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class RequestChangePriceDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  price: number;
}
