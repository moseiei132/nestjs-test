import { Forum } from 'src/forums/entities/forum.entity'
import { Post } from 'src/posts/entities/post.entity'
import { User } from 'src/users/entities/user.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('topics')
export class Topic {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'forum_id' })
  forumId: number

  @Column({ name: 'user_id' })
  userId: number

  @Column()
  name: string

  @Column({ name: 'created_at' })
  createdAt: Date

  @Column({ name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => Forum, (forum) => forum.topics)
  @JoinColumn({ name: 'forum_id' })
  forum: Forum

  @OneToMany(() => Post, (post) => post.topic)
  posts: Post[]

  @ManyToOne(() => User, (user) => user.topics)
  @JoinColumn({ name: 'user_id' })
  user: User[]
}
