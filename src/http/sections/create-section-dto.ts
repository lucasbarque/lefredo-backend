import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSectionDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsUUID()
  @IsNotEmpty()
  menuId: string;
}
