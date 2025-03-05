import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class RequestUpdateDishExtrasOrderDTO {
  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  orderUpdated: string[];
}
