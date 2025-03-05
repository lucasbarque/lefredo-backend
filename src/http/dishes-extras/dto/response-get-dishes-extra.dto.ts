import { ApiProperty } from '@nestjs/swagger';

export class ResponseGetDishesExtraDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;
}
