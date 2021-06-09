import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'
import { UseUser } from '../common/decorators/user.decorator'
import { User } from '../users/entities/user.entity'

import { PostBodyDto } from './dtos/post.dto'
import { PostEntity } from './entities/post.entity'
import { PostService } from './services/post.service'
import { TPost } from './transformers/post.transformer'

@ApiTags('PostController')
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(
    @UseUser() user: User,
      @Body() postDto: PostBodyDto,
  ): Promise<PostEntity> {
    return this.postService.createPost({
      topicId: postDto.topicId,
      userId: user.id,
      body: postDto.body,
    })
  }

  @Get()
  getPosts(): Promise<TPost[]> {
    return this.postService.getPosts()
  }

  @Get('/:id')
  getPost(@Param('id') id: number): Promise<TPost> {
    return this.postService.getPost(id)
  }

  @Get('byTopicId/:topicId')
  getPostsByTopicId(@Param('topicId') topicId: number): Promise<TPost[]> {
    return this.postService.getPostsByTopicId(topicId)
  }
}
