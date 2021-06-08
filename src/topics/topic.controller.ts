import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { TopicService } from './services/topic.service'
import { TTopic } from './transformers/topic.transformer'

@ApiTags('TopicController')
@Controller('topic')
export class TopicController {
  constructor(private topicService: TopicService) {}

  @Get()
  getTopics():Promise<TTopic[]>{
    return this.topicService.getTopics()
  }

  @Get('byForumId/:forumId')
  getTopicsByForumId(@Param('forumId') forumId: number):Promise<TTopic[]> {
    return this.topicService.getTopicsByForumId(forumId)
  }

  @Get('/:id')
  getTopic(@Param('id') id: number):Promise<TTopic> {
    return this.topicService.getTopic(id)
  }
}
