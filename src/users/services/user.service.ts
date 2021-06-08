import { Injectable } from '@nestjs/common'
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

  async getAllUser() {
    const users = await this.userRepo.find()
    return plainToClass(TUser, users)
  }

  async getUserInfo(id: number) {
    const user = await this.userRepo.findOne(id)
    return plainToClass(TUser, user)
  }

  findByUsername(username: string) {
    return this.userRepo.findOne({ username: username })
  }
}
