import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModel } from 'src/user/model/users.model';
import { RolesModel } from 'src/user/model/roles.model';
import { UserRoleModel } from 'src/user/model/userRole.model';
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        autoLoadModels: true,
        synchronize: true,
        models: [UsersModel, RolesModel, UserRoleModel],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
