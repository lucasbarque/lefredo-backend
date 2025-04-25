import { ApiProperty } from '@nestjs/swagger';

export class RequestUploadDishImageDTO {
  @ApiProperty()
  file: string;
}
