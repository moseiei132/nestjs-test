import { IUser } from 'src/users/interfaces/user.interface'

export interface IAccessToken {
  accessToken: string
}

export interface RequestUser extends Request {
  user: IUser
}
