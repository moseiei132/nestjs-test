import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ForumService } from './services/forum.service'

@ApiTags('forumController')
@Controller('forum')
export class ForumController {
  constructor(private forumService: ForumService) {}

  @Get()
  async getForums() {
    return this.forumService.getForums()
  }

  @Get('/:id')
  async getForum(@Param('id') id: number) {
    return this.forumService.getForum(id)
  }
}
