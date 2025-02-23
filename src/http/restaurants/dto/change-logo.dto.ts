import { ApiProperty } from '@nestjs/swagger';

export class ChangeLogoDTO {
  @ApiProperty()
  file: string;
}
