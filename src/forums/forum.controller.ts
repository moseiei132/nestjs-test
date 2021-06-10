import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { CreateForumDto } from './dtos/forum.dto'
import { Forum } from './entities/forum.entity'
import { ForumService } from './services/forum.service'
import { TForum } from './transformers/forum.transformer'

@ApiTags('forumController')
@Controller('forums')
export class ForumController {
  constructor(private forumService: ForumService) {}

  @Get()
  @ApiOkResponse()
  async getForums(): Promise<TForum[]> {
    return this.forumService.getForums()
  }

  @Get('/:id')
  @ApiOkResponse()
  async getForum(@Param('id') id: number): Promise<TForum> {
    return this.forumService.getForum(id)
  }

  @Post()
  @ApiCreatedResponse()
  async createForum(
    @Body() data: CreateForumDto,
  ): Promise<CreateForumDto & Forum> {
    return this.forumService.createForum(data)
  }
}
