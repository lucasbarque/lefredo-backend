import { ApiProperty } from '@nestjs/swagger';
import { DishMediasDTO } from './dish-medias.dto';
import { DishSpecsDTO } from 'src/http/dishes-specs/dto/dish-specs.dto';
import { DishFlavorsDTO } from 'src/http/dishes-flavors/dto/dish-flavors.dto';
import { SectionDTO } from 'src/http/sections/dto/section-dto';
import { DishExtraDTO } from 'src/http/dishes-extras/dto';

export class DishDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ nullable: true })
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  portion: string;

  @ApiProperty()
  prepTime: number;

  @ApiProperty({ type: SectionDTO })
  section: SectionDTO;

  @ApiProperty({ type: [DishExtraDTO] })
  dishExtras: DishExtraDTO[] | [];

  @ApiProperty({ type: [DishFlavorsDTO] })
  dishFlavors: DishFlavorsDTO[] | [];

  @ApiProperty({ type: [DishMediasDTO] })
  dishMedias: DishMediasDTO[] | [];

  @ApiProperty({ type: [DishSpecsDTO] })
  dishSpecs: DishSpecsDTO[] | [];

  @ApiProperty()
  dishExtrasOrder?: string[] | null;
}
