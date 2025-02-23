import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadSingleFileDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  referenceId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  referenceName: string;

  @ApiProperty()
  file: string;
}
