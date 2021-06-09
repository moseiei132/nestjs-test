
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Forum } from '../../forums/entities/forum.entity'
import { PostEntity } from '../../posts/entities/post.entity'
import { User } from '../../users/entities/user.entity'

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
  forum?: Forum

  @OneToMany(() => PostEntity, (post) => post.topic)
  posts?: PostEntity[]

  @ManyToOne(() => User, (user) => user.topics)
  @JoinColumn({ name: 'user_id' })
  user?: User[]
}
