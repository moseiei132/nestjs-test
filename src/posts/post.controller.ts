import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { PostService } from './services/post.service'
import { TPost } from './transformers/post.transformer'

@ApiTags('PostController')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getPosts():Promise<TPost[]> {
    return this.postService.getPosts()
  }

  @Get('/:id')
  getPost(@Param('id') id: number):Promise<TPost> {
    return this.postService.getPost(id)
  }

  @Get('byTopicId/:topicId')
  getPostsByTopicId(@Param('topicId') topicId: number):Promise<TPost[]> {
    return this.postService.getPostsByTopicId(topicId)
  }
}
