import { IsNotEmpty, IsString } from 'class-validator';

export class GetResturantDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
