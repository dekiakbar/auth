import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserModel } from './model/user.model';

@Module({
  imports:[
    DatabaseModule,
    SequelizeModule.forFeature([UserModel])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
