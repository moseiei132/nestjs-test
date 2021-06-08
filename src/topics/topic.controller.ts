import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { InjectRepository } from '@nestjs/typeorm'
import { TopicRepository } from './repositories/topic.repository'
import { ITopic } from './interfaces/topic.interface'
import { TTopic } from './transformers/topic.transformer'
import { plainToClass } from 'class-transformer'
import { TopicService } from './services/topic.service'

@ApiTags('TopicController')
@Controller('topic')
export class TopicController {
  constructor(private topicService: TopicService) {}

  @Get()
  getTopics() {
    return this.topicService.getTopics()
  }

  @Get('byForumId/:forumId')
  getTopicsByForumId(@Param('forumId') forumId: number) {
    return this.topicService.getTopicsByForumId(forumId)
  }

  @Get('/:id')
  getTopic(@Param('id') id: number) {
    return this.topicService.getTopic(id)
  }
}
