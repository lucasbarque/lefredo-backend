import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSectionInput {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsUUID()
  @IsNotEmpty()
  menuId: string;
}
