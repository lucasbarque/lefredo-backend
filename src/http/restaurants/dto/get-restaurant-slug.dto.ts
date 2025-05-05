import { ApiProperty } from '@nestjs/swagger';

class Menu {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;
}

export class GetRestaurantBySlugDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ nullable: true })
  welcomeMessage: string;

  @ApiProperty({ nullable: true })
  logo: string;

  @ApiProperty()
  slug: string;

  @ApiProperty({ type: Menu, isArray: true })
  Menu: Menu[];
}
