import { ApiProperty } from '@nestjs/swagger';

export class GetRestaurantByIdDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ nullable: true })
  welcomeMessage: string;

  @ApiProperty({ nullable: true })
  logo: string;
}
