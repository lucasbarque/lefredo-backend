import { ApiProperty } from '@nestjs/swagger';

export class SectionDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  isActive: boolean;
}
