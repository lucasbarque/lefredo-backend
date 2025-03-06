import { ApiProperty } from '@nestjs/swagger';

export class ResponseGetDishesFlavorsDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  label: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  price: number | null;
}
