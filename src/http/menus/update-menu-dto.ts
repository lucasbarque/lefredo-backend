import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMenuDTO {
  @IsNotEmpty()
  @IsString()
  title: string;
}
