import { IsNotEmpty, IsString } from 'class-validator';

export class CreateResturantDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  slug: string;
}
