import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { AccountProviderEnum } from 'src/auth/dto/sign-in.dto';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  picture: string;

  @IsNotEmpty()
  @IsEnum(AccountProviderEnum)
  provider: string;

  @IsNotEmpty()
  providerId: string;
}
