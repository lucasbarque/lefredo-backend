import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RequestCreateSectionDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  menuId: string;

  @IsString()
  @ApiProperty({ nullable: true })
  description?: string | null;
}
