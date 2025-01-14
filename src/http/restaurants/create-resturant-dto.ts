import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateResturantDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
