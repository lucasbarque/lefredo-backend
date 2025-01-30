import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateMenuDTO {
  @IsNotEmpty()
  @IsString()
  title: string;
}
