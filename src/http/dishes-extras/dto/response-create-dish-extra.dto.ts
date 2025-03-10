import { ApiProperty } from '@nestjs/swagger';

export class ResponseCreateDishExtraDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  dishId: string;
}
