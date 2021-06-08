import { Exclude } from 'class-transformer'

export class TTopic {
  id: number

  forumId: number

  userId: number

  name: string

  @Exclude()
  createdAt: Date

  @Exclude()
  updatedAt: Date

  constructor(partial: Partial<TTopic>) {
    Object.assign(this, partial)
  }
}
