import { ApiProperty } from '@nestjs/swagger';

export class ResponseCreateDishesFlavorsDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  dishId: string;
}
