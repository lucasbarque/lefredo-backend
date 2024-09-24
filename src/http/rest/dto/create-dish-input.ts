import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateDishDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsUUID()
  @IsNotEmpty()
  sectionId: string;
}
