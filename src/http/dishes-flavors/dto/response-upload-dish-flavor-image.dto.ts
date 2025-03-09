import { ApiProperty } from '@nestjs/swagger';

export class ResponseUploadDishFlavorImageDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  url: string;
}
