import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')  //table name in database
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({name: "created_at"})
    createdAt: Date;

    @Column({name: "updated_at"})
    updatedAt: Date;
}