import { ApiProperty } from '@nestjs/swagger';

export class ChangeLogoResponseDTO {
  @ApiProperty()
  logo: string;
}
