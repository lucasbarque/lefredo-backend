import { ApiProperty } from '@nestjs/swagger';
import { DishFlavorsMediaDTO } from './dish-flavors-medias.dto';

export class DishFlavorsDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  label: string;

  @ApiProperty()
  price: number | null;

  @ApiProperty()
  description: string | null;

  @ApiProperty({ type: DishFlavorsMediaDTO, isArray: true })
  dishFlavorsMedias: DishFlavorsMediaDTO[];
}
