import { ApiProperty } from '@nestjs/swagger';
import { DishSpecsDTO } from './dish-specs.dto';
import { DishMediasDTO } from './dish-medias.dto';
import { DishExtrasDTO } from './dish-extras.dto';
import { DishFlavorsDTO } from './dish-flavors.dto';

class Section {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string | null;
}

export class GetDishDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  price: number;

  @ApiProperty()
  portion: string;

  @ApiProperty()
  prepTime: string | null;

  @ApiProperty({ type: Section })
  section: Section;

  @ApiProperty({ type: [DishExtrasDTO] })
  dishExtras: DishExtrasDTO[] | [];

  @ApiProperty({ type: [DishFlavorsDTO] })
  dishFlavors: DishFlavorsDTO[] | [];

  @ApiProperty({ type: [DishMediasDTO] })
  dishMedias: DishMediasDTO[] | [];

  @ApiProperty({ type: [DishSpecsDTO] })
  dishSpecs: DishSpecsDTO[] | [];
}
