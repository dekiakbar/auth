import { PartialType } from '@nestjs/mapped-types';
import { UsersModel } from '../model/users.model';
import { IsNotEmpty, IsString } from 'class-validator';
export class SignInResponseDto extends PartialType(UsersModel) {
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
