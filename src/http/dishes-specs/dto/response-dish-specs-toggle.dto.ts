import { ApiProperty } from '@nestjs/swagger';
import { SpecsKey } from './dish-specs.dto';

export class ResponseDishSpecsToggleDTO {
  @ApiProperty({
    enum: [
      'vegetarian',
      'lactfree',
      'vegan',
      'cold',
      'hot',
      'organic',
      'suggarfree',
      'natural',
      'highlighted',
    ],
  })
  key: SpecsKey;

  @ApiProperty()
  oldStateIsActive: boolean;

  @ApiProperty()
  newStateIsActive: boolean;
}
