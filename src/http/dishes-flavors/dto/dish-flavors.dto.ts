import { ApiProperty } from '@nestjs/swagger';

export class DishFlavorsDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number | null;
}
