import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateMenuInput {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsUUID()
  restaurantId: string;
}
