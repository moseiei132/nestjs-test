import { Exclude } from 'class-transformer'

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
