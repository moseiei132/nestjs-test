import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { InjectRepository } from '@nestjs/typeorm'
import { PostRepository } from './repositories/post.repository'
import { PostService } from './services/post.service'

@ApiTags('PostController')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getPosts() {
    return this.postService.getPosts()
  }

  @Get('/:id')
  getTopic(@Param('id') id: number) {
    return this.postService.getPost(id)
  }

  @Get('byTopicId/:topicId')
  getPostsByTopicId(@Param('topicId') topicId: number) {
    return this.postService.getPostsByTopicId(topicId)
  }
}
