import { ApiProperty } from '@nestjs/swagger';
import { DishFlavorsMediaDTO } from './dish-flavors-medias.dto';

export class DishFlavorsDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  label: string;

  @ApiProperty({ nullable: true })
  price: number;

  @ApiProperty({ nullable: true })
  description: string;

  @ApiProperty({ type: DishFlavorsMediaDTO, isArray: true })
  dishFlavorsMedias: DishFlavorsMediaDTO[];
}
