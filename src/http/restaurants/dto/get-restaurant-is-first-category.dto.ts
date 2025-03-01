import { ApiProperty } from '@nestjs/swagger';

export class GetRestaurantIsFirstCategoryDTO {
  @ApiProperty()
  isFirstCategory: boolean;
}
