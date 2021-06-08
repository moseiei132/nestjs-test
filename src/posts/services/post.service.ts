import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToClass } from 'class-transformer'
import { PostRepository } from '../repositories/post.repository'
import { TPost } from '../transformers/post.transformer'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepo: PostRepository,
  ) {}

  async getPosts():Promise<TPost[]> {
    const posts = await this.postRepo.find({ order: { createdAt: 'ASC' } })
    return plainToClass(TPost, posts)
  }

  async getPost(id: number):Promise<TPost> {
    const post = await this.postRepo.findOne(id)
    return plainToClass(TPost, post)
  }

  async getPostsByTopicId(topicId: number):Promise<TPost[]> {
    const posts = await this.postRepo.find({
      where: { topicId },
      order: { createdAt: 'ASC' },
    })
    return plainToClass(TPost, posts)
  }
}
