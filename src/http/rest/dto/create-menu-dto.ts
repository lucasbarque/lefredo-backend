import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateMenuDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsUUID()
  restaurantId: string;
}
