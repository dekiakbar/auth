import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginTicket, OAuth2Client } from 'google-auth-library';
import { AccountProviderEnum, SignInDto } from '../dto/sign-in.dto';
import { UsersService } from 'src/user/service/users.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignInResponseDto } from 'src/user/dto/sign-in-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private oAuth2Client: OAuth2Client,
    private readonly userService: UsersService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    // handle signin using gmail
    if (signInDto.account.provider === AccountProviderEnum.GOOGLE) {
      const result = await this.processGmailSignIn(signInDto);
      return result;
    }

    return false;
  }

  async processGmailSignIn(signInDto: SignInDto): Promise<SignInResponseDto> {
    const responseValidation = await this.validateGoogleToken(signInDto);
    const payload = responseValidation.getPayload();
    let user = await this.userService.findUserByEmail(payload.email);

    if (!user) {
      const data: CreateUserDto = new CreateUserDto();
      data.name = payload.name ? payload.name : signInDto.user.name;
      data.email = payload.email ? payload.email : signInDto.user.email;
      data.picture = payload.picture ? payload.picture : signInDto.user.image;
      data.provider = signInDto.account.provider;
      data.providerId = signInDto.user.id;
      user = await this.userService.create(data);
    }

    const accessToken = this.jwtService.sign({ name: user.name });
    const { createdAt, updatedAt, ...normalizedUser } = user.toJSON();
    const response: SignInResponseDto = {
      ...normalizedUser,
      accessToken: accessToken,
    };
    
    return response;
  }

  /**
   *
   * Validate id_token to google api.
   *
   * @param {SignInDto} signInDto
   *
   * @returns
   */
  async validateGoogleToken(signInDto: SignInDto): Promise<LoginTicket> {
    const idToken = signInDto.account?.id_token;

    if (!idToken) {
      throw new BadRequestException('id_token should not be empty');
    }

    try {
      const response = await this.oAuth2Client.verifyIdToken({
        idToken: signInDto.account.id_token,
      });

      return response;
    } catch (error) {
      if (error.name === 'Error') {
        const normalizedMessage = error.message.substring(
          0,
          error.message.indexOf(':'),
        );
        throw new BadRequestException(normalizedMessage);
      }
    }
  }
}
