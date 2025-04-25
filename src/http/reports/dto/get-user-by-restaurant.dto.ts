import { ApiProperty } from '@nestjs/swagger';

enum UserRole {
  ADMIN = 'ADMIN',
}

export class GetUserByRestaurantId {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  clerkId: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty({ enum: ['ADMIN'] })
  role: UserRole;

  @ApiProperty()
  onboardingFinished: boolean;

  @ApiProperty()
  restaurantId: string | null;
}
