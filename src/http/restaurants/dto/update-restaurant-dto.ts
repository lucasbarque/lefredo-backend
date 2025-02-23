import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateResturantDTO {
  @ApiProperty()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsString()
  welcomeMessage?: string;
}
