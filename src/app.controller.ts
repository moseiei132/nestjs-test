import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { InjectRepository } from '@nestjs/typeorm'
import { AppService } from './app.service'
import { ForumRepository } from './forums/repositories/forum.repository'
import { PostRepository } from './posts/repositories/post.repository'
import { TopicRepository } from './topics/repositories/topic.repository'

@ApiTags('AppController')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
