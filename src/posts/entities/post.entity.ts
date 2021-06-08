import { Topic } from 'src/topics/entities/topic.entity'
import { User } from 'src/users/entities/user.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('posts')
export class Post {
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

  @ManyToOne((type) => User, (user) => user.topics)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne((type) => Topic, (topic) => topic.posts)
  @JoinColumn({ name: 'topic_id' })
  topic: Topic
}
