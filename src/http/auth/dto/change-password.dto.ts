import { IsNotEmpty, IsString } from 'class-validator';
import { Match } from '../decorators/match.decorator';

export class ChangePasswordDTO {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Match('password', { message: 'Password does not match' })
  confirmationPassword: string;
}
