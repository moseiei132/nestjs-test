
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Topic } from '../../topics/entities/topic.entity'
import { User } from '../../users/entities/user.entity'

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'topic_id' })
  topicId: number

  @Column({ name: 'user_id' })
  userId: number

  @Column()
  body: string

  @Column({ name: 'created_at' })
  createdAt: Date

  @Column({ name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => User, (user) => user.topics)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => Topic, (topic) => topic.posts)
  @JoinColumn({ name: 'topic_id' })
  topic: Topic
}
