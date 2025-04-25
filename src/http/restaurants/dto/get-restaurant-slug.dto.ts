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

  @ApiProperty()
  welcomeMessage: string | null;

  @ApiProperty()
  logo: string | null;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  Menu: Menu[];
}
