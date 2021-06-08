import { Exclude } from 'class-transformer'
import { Topic } from 'src/topics/entities/topic.entity'
import { TTopic } from 'src/topics/transformers/topic.transformer'
import { User } from 'src/users/entities/user.entity'
import { TUser } from 'src/users/transformers/user.transformer'

export class TPost {
  id: number

  topicId: number

  userId: number

  body: string

  @Exclude()
  createdAt: Date

  @Exclude()
  updatedAt: Date

  constructor(partial: Partial<TPost>) {
    Object.assign(this, partial)
  }
}
