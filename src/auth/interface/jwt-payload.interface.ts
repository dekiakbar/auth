import { RoleEnum } from 'src/user/enum/role.enum';

export interface JwtPayloadInterface {
  name: string;
  roles: RoleEnum[];
  iat?: string | null;
  exp?: string | null;
}
