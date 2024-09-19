import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateDishInput {
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
