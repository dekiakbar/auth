import { Column, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'user',
    underscored: true,
    timestamps: true,
})
export class UserModel extends Model{
    @Column
    name: string;

    @Column
    email: string;

    @Column
    image: string;
}