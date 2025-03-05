import { ApiProperty } from '@nestjs/swagger';
import { SpecsKey } from './dish-specs.dto';
import { IsEnum } from 'class-validator';

enum SpecsKeyEnum {
  vegetarian = 'vegetarian',
  lactfree = 'lactfree',
  vegan = 'vegan',
  cold = 'cold',
  hot = 'hot',
  organic = 'organic',
  suggarfree = 'suggarfree',
  natural = 'natural',
  highlighted = 'highlighted',
}

export class RequestDishSpecsToggleDTO {
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
  @IsEnum(SpecsKeyEnum, { each: true })
  key: SpecsKey;
}
