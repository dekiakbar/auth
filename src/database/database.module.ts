import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports:[
        SequelizeModule.forRootAsync({

        })
    ]
})
export class DatabaseModule {}
