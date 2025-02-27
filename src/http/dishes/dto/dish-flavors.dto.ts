import { ApiProperty } from '@nestjs/swagger';

class DishFlavorsMedias {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  url: string;
}

export class DishFlavorsDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  label: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  dishId: string;

  @ApiProperty({ type: [DishFlavorsMedias] })
  dishFlavorsMedias: DishFlavorsMedias[];
}
