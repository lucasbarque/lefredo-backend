import { ApiProperty } from '@nestjs/swagger';
import { DishSpecsDTO } from './dish-specs.dto';
import { DishMediasDTO } from './dish-medias.dto';

export class GetDishesDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  portion: string;

  @ApiProperty()
  prepTime: string | null;

  @ApiProperty({ type: [DishSpecsDTO] })
  dishSpecs: DishSpecsDTO[] | [];

  @ApiProperty({ type: [DishMediasDTO] })
  dishMedias: DishMediasDTO[] | [];
}
