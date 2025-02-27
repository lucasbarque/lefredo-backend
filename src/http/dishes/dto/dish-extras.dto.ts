import { ApiProperty } from '@nestjs/swagger';

export class DishExtrasDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;
}
