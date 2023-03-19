import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UsersModel } from '../model/users.model';
import { RolesService } from './roles.service';
import { RolesModel } from '../model/roles.model';
import { RoleEnum } from '../enum/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UsersModel)
    private readonly userModel: typeof UsersModel,
    private rolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UsersModel> {
    const newUser = await this.userModel.create({
      name: createUserDto.name,
      email: createUserDto.email,
      picture: createUserDto.picture,
      provider: createUserDto.provider,
      providerId: createUserDto.providerId,
    });

    // assign role when user is created.
    const user = await this.assignRole(newUser);
    console.log(user);
    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    const user = await this.userModel.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: RolesModel,
          attributes: ['code'],
        },
      ],
    });

    if (!user) {
      throw new NotFoundException('The user is not exit.');
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string): Promise<UsersModel> {
    const user = await this.userModel.findOne({
      where: {
        email: email,
      },
      include: [
        {
          model: RolesModel,
          attributes: ['code'],
        },
      ],
    });

    return user;
  }

  async assignRole(user: UsersModel): Promise<UsersModel> {
    const roleCode = await this.rolesService.getDefaultRole(user);
    const role = await this.rolesService.findOrCreateByCode(roleCode);

    /**
     * If role code is admin, also assign user role to admin.
     */
    if (roleCode === RoleEnum.ADMIN) {
      const userRole = await this.rolesService.findOrCreateByCode(
        RoleEnum.USER,
      );
      await user.$add('roles', [role.id]);
      await user.$add('roles', [userRole.id]);
    } else {
      // assign only user role
      await user.$add('roles', [role.id]);
    }

    await user.reload({
      include: [RolesModel],
    });

    await user.save();

    return user;
  }
}
