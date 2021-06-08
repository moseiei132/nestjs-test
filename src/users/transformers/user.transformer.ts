import { Exclude } from 'class-transformer'
import { Post } from 'src/posts/entities/post.entity'
import { TPost } from 'src/posts/transformers/post.transformer'
import { Topic } from 'src/topics/entities/topic.entity'
import { TTopic } from 'src/topics/transformers/topic.transformer'

export class TUser {
  id: number
  username: string
  @Exclude()
  password: string
  @Exclude()
  createdAt: Date
  @Exclude()
  updatedAt: Date

  constructor(partial: Partial<TUser>) {
    Object.assign(this, partial)
  }
}
