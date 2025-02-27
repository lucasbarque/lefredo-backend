import { ApiProperty } from '@nestjs/swagger';

class DishSpec {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ enum: ['cold', 'hot', 'vegan', 'highlited'] })
  key: 'cold' | 'hot' | 'vegan' | 'highlighted';
}

export class DishSpecsDTO {
  @ApiProperty()
  dishSpecsId: string;

  @ApiProperty()
  dishId: string;

  @ApiProperty()
  DishSpecs: DishSpec;
}
