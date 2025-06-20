import { ApiProperty } from '@nestjs/swagger';
import { DishMediasDTO } from './dish-medias.dto';
import { DishSpecsDTO } from 'src/http/dishes-specs/dto/dish-specs.dto';

export class ResponseGetDishesDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  portion: string;

  @ApiProperty()
  prepTime: number | undefined;

  @ApiProperty({ type: [DishSpecsDTO] })
  dishSpecs: DishSpecsDTO[] | [];

  @ApiProperty({ type: [DishMediasDTO] })
  dishMedias: DishMediasDTO[] | [];

  @ApiProperty()
  isActive: boolean;
}
