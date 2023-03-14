import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './service/users.service';
import { UsersModel } from './model/users.model';
import { UsersController } from './controller/users.controller';
@Module({
  imports: [DatabaseModule, SequelizeModule.forFeature([UsersModel])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
