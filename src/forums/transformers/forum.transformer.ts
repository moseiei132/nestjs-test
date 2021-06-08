import { Exclude } from 'class-transformer'
import { TTopic } from 'src/topics/transformers/topic.transformer'

export class TForum {
  id: number

  name: string

  description: string
  @Exclude()
  createdAt: Date
  @Exclude()
  updatedAt: Date

  constructor(partial: Partial<TForum>) {
    Object.assign(this, partial)
  }
}
