import { IUser } from 'src/users/interfaces/user.interface'

export interface ITopic {
  id: number
  forumId: number
  name: string
  user: IUser[]
  createdAt: Date
  updatedAt: Date
}
