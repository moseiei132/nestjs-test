import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from 'src/users/repositories/user.repository'
import { LoginDto } from '../dtos/auth.dto'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/users/create-user.dto'
import { IAccessToken } from '../interfaces/auth.interface'
import { User } from 'src/users/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
  ) {}
  async login(data: LoginDto): Promise<IAccessToken> {
    const user = await this.userRepo.findOne({ username: data.username })
    if (user) {
      const isMatch = await bcrypt.compare(data.password, user.password)
      if (!isMatch) {
        throw new UnauthorizedException('Invalid password')
      }
      return {
        accessToken: this.jwtService.sign({
          id: user.id,
          username: data.username,
        }),
      }
    }
    throw new UnauthorizedException('USER DOES NOT EXIST')
  }

  async register(userData: CreateUserDto): Promise<CreateUserDto & User> {
    userData.password = await bcrypt.hash(userData.password, 10)
    return this.userRepo.save(userData)
  }
}
