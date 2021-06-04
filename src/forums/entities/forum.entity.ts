import { Topic } from "src/topics/entities/topic.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('forums')
export class Forum{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({name: "created_at"})
    createdAt: Date;

    @Column({name: "updated_at"})
    updatedAt: Date;

    @OneToMany(type => Topic, topic => topic.forum)
    topics: Topic[];
}