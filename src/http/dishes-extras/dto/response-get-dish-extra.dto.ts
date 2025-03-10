import { ApiProperty } from '@nestjs/swagger';

export class ResponseGetDishExtraDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;
}
