import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { UseUser } from 'src/common/decorators/user.decorator'
import { User } from 'src/users/entities/user.entity'
import { DeleteResult } from 'typeorm'
import { TopicBodyDto } from './dtos/topic.dto'
import { Topic } from './entities/topic.entity'
import { TopicService } from './services/topic.service'
import { TTopic } from './transformers/topic.transformer'

@ApiTags('TopicController')
@Controller('topics')
export class TopicController {
  constructor(private topicService: TopicService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/:forumId')
  @ApiCreatedResponse()
  async createTopic(
    @UseUser() user: User,
      @Param('forumId') forumId: number,
      @Body() topicDto: TopicBodyDto,
  ): Promise<Topic> {
    return this.topicService.createTopic({
      userId: user.id,
      forumId: forumId,
      name: topicDto.name,
      body: topicDto.body,
    })
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse()
  @Delete('/:id')
  async deleteTopic(
    @Param('id') id: number,
      @UseUser() user: User,
  ): Promise<DeleteResult> {
    return this.topicService.deleteTopic({ topicId: id, userId: user.id })
  }

  @ApiOkResponse()
  @Get()
  getTopics(): Promise<TTopic[]> {
    return this.topicService.getTopics()
  }

  @ApiOkResponse()
  @Get('byForumId/:forumId')
  getTopicsByForumId(@Param('forumId') forumId: number): Promise<TTopic[]> {
    return this.topicService.getTopicsByForumId(forumId)
  }

  @ApiOkResponse()
  @Get('/:id')
  getTopic(@Param('id') id: number): Promise<TTopic> {
    return this.topicService.getTopic(id)
  }
}
