import { ApiProperty } from '@nestjs/swagger';

export class ResponseGetSectionByIdDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ nullable: true })
  description: string | null;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  isActive: boolean;
}
