import { ApiProperty } from '@nestjs/swagger';

export class DishMediasDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  url: string;
}
