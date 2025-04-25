import { ApiProperty } from '@nestjs/swagger';

export class DishFlavorsMediaDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  url: string;
}
