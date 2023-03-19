import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { SignInDto } from '../dto/sign-in.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/user/service/users.service';
import { Roles } from '../decorator/roles.decorator';
import { RoleEnum } from 'src/user/enum/role.enum';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('/signin')
  create(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(RoleEnum.USER)
  @Post('/user')
  user(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(RoleEnum.ADMIN)
  @Post('/admin')
  admin(@Request() req) {
    return req.user;
  }
}
