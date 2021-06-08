import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ForumService } from './services/forum.service'
import { TForum } from './transformers/forum.transformer'

@ApiTags('forumController')
@Controller('forum')
export class ForumController {
  constructor(private forumService: ForumService) {}

  @Get()
  async getForums():Promise<TForum[]> {
    return this.forumService.getForums()
  }

  @Get('/:id')
  async getForum(@Param('id') id: number):Promise<TForum> {
    return this.forumService.getForum(id)
  }
}
