import { ApiProperty } from '@nestjs/swagger';

export class GetSectionsDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  slug: string;
}
