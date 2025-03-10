import { ApiProperty } from '@nestjs/swagger';

export class ResponseUploadDishImageDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  url: string;
}
