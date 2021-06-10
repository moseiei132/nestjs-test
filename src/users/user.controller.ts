import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { User } from './entities/user.entity'
import { UserService } from './services/user.service'
import { UseUser } from '../common/decorators/user.decorator'
import { AuthGuard } from '@nestjs/passport'
import { plainToClass } from 'class-transformer'
import { TUser } from './transformers/user.transformer'

@ApiTags('UserController')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('info')
  getInfo(@UseUser() user: User): User {
    return user
  }

  @Get()
  @ApiOkResponse()
  getAllUser(): TUser {
    const users = plainToClass(TUser, this.userService.getAllUser())
    return users
  }

  @Get('/:id')
  @ApiOkResponse()
  getUserInfo(@Param('id') id: number): Promise<TUser> {
    return this.userService.getUserInfo(id)
  }

  @Get('findByUsername/:username')
  @ApiOkResponse()
  findByEmail(@Param('username') username: string): Promise<TUser> {
    return this.userService.findByUsername(username)
  }
}
