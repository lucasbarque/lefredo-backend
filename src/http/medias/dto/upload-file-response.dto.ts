import { ApiProperty } from '@nestjs/swagger';

export class UploadFileResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  referenceId: string;

  @ApiProperty()
  referenceName: string;

  @ApiProperty()
  filename: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
