import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UsersModel } from '../model/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UsersModel)
    private readonly userModel: typeof UsersModel,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UsersModel> {
    const newUser = await this.userModel.create({
      name: createUserDto.name,
      email: createUserDto.email,
      picture: createUserDto.picture,
      provider: createUserDto.provider,
      providerId: createUserDto.providerId,
    });

    return newUser;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
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
    });

    return user;
  }
}
