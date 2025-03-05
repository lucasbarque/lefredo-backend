import { ApiProperty } from '@nestjs/swagger';

export type SpecsKey =
  | 'vegetarian'
  | 'lactfree'
  | 'vegan'
  | 'cold'
  | 'hot'
  | 'organic'
  | 'suggarfree'
  | 'natural'
  | 'highlighted';

export const DishSpecsMap: Record<SpecsKey, string> = {
  highlighted: '61df89fb-cbbd-47fd-9517-2ff0744fc95d',
  vegetarian: '6e7ae31d-5cc5-4eda-b980-600b6f417245',
  lactfree: '4b709494-3d5e-4a11-983f-e5dd153b510f',
  vegan: 'd99cc296-d309-4188-ba73-19f2b384a37b',
  cold: 'cd04b2e4-7094-4899-ad1f-dabc73c14a63',
  hot: '5715d021-c992-471e-9fc4-eea0006f54bd',
  organic: '72f4788b-97db-483b-a7e3-d76b0b8f096f',
  suggarfree: '3ee5bb92-a3bc-4dc4-ba0d-94789cf6ad56',
  natural: '6dbaed54-2c08-4d62-b175-c60b5d4fadcc',
};

class DishSpec {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

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
}

export class DishSpecsDTO {
  @ApiProperty()
  dishSpecsId: string;

  @ApiProperty()
  dishId: string;

  @ApiProperty()
  DishSpecs: DishSpec;
}
