import { ApiProperty } from '@nestjs/swagger';

export class ResponseCreateDishDTO {
  @ApiProperty()
  id: string;
}
