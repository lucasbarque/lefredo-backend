import { ApiProperty } from '@nestjs/swagger';
import { DishMediasDTO } from './dish-medias.dto';
import { DishSpecsDTO } from 'src/http/dishes-specs/dto/dish-specs.dto';

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
