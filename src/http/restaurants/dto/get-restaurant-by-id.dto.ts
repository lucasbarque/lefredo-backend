import { ApiProperty } from '@nestjs/swagger';

export class GetRestaurantByIdDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  welcomeMessage: string | null;

  @ApiProperty()
  logo: string | null;
}
