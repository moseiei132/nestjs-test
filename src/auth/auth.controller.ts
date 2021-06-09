import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from 'src/users/create-user.dto'
import { User } from 'src/users/entities/user.entity'
import { IUser } from 'src/users/interfaces/user.interface'
import { LoginDto } from './dtos/auth.dto'
import { IAccessToken, RequestUser } from './interfaces/auth.interface'
import { AuthService } from './services/auth.service'

@ApiTags('AuthController')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto): Promise<IAccessToken> {
    return this.authService.login(data)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req: RequestUser): IUser {
    return req.user
  }

  @Post('register')
  register(@Body() data: CreateUserDto): Promise<CreateUserDto & User> {
    return this.authService.register(data)
  }
}
