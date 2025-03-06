import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class RequestUpdateDishFlavorsOrderDTO {
  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  orderUpdated: string[];
}
