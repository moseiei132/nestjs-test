import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToClass } from 'class-transformer'
import { UserRepository } from '../repositories/user.repository'
import { TUser } from '../transformers/user.transformer'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
  ) {}

  async getAllUser(): Promise<TUser[]> {
    const users = await this.userRepo.find()
    if (users.length === 0) throw new NotFoundException('Users not found')
    return plainToClass(TUser, users)
  }

  async getUserInfo(id: number): Promise<TUser> {
    const user = await this.userRepo.findOne(id)
    if (!user) throw new NotFoundException('User not found')
    return plainToClass(TUser, user)
  }

  async findByUsername(username: string): Promise<TUser> {
    const user = this.userRepo.findOne({ username: username })
    if (!user) throw new NotFoundException('User not found')
    return plainToClass(TUser, user)
  }
}
