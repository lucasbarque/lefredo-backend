import { ApiProperty } from '@nestjs/swagger';

export class DishExtraDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;
}
