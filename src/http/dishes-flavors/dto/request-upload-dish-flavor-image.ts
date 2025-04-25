import { ApiProperty } from '@nestjs/swagger';

export class RequestUploadDishFlavorImageDTO {
  @ApiProperty()
  file: string;
}
