import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested
} from 'class-validator';

export class SignInUserDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  readonly name: string | null;
  readonly email: string | null;
  readonly image: string | null;
}

export enum ProviderTypeEnum {
  OAUTH = 'oauth',
  EMAIL = 'email',
  CREDENTIALS = 'credentials',
}

export enum AccountProviderEnum {
  GOOGLE = 'google',
}

export class SignInAccountDto {
  @IsNotEmpty()
  @IsString()
  readonly providerAccountId: string;

  @IsEnum(AccountProviderEnum)
  readonly provider: string;

  @IsEnum(ProviderTypeEnum)
  readonly type: ProviderTypeEnum;

  readonly userId: string | null;
  readonly access_token: string | null;
  readonly token_type: string | null;
  readonly id_token: string | null;
  readonly refresh_token: string | null;
  readonly scope: string | null;
  readonly expires_at: number;
  readonly session_state: string | null;
}

export class SignInDto {
  @Type(() => SignInUserDto)
  @ValidateNested()
  readonly user: SignInUserDto;

  @Type(() => SignInAccountDto)
  @ValidateNested()
  readonly account: SignInAccountDto;
}
