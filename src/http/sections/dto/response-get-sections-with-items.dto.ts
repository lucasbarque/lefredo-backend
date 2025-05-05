import { ApiProperty } from '@nestjs/swagger';
import { DishMediasDTO } from 'src/http/dishes/dto/dish-medias.dto';

class Dish {
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
  prepTime: number | undefined;

  @ApiProperty({ type: [DishMediasDTO] })
  dishMedias: DishMediasDTO | [];

  @ApiProperty()
  isActive: boolean;
}

export class ResponseGetSectionsWithItemsDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ nullable: true })
  description: string | null;

  @ApiProperty()
  slug: string;

  @ApiProperty({ type: [Dish] })
  Dish: Dish[] | [];

  @ApiProperty()
  isActive: boolean;
}
