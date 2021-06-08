import { Post } from 'src/posts/entities/post.entity'
import { Topic } from 'src/topics/entities/topic.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users') //table name in database
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @Column({ name: 'created_at' })
  createdAt: Date

  @Column({ name: 'updated_at' })
  updatedAt: Date

  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[]

  @OneToMany((type) => Topic, (topic) => topic.user)
  topics: Topic[]
}
