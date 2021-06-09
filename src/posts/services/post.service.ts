import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToClass } from 'class-transformer'
import { DeleteResult } from 'typeorm'
import { PostEntity } from '../entities/post.entity'
import { IEditPost, IPost } from '../interfaces/post.interface'
import { PostRepository } from '../repositories/post.repository'
import { TPost } from '../transformers/post.transformer'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepo: PostRepository,
  ) {}

  async getPosts(): Promise<TPost[]> {
    const posts = await this.postRepo.find({ order: { createdAt: 'ASC' } })
    return plainToClass(TPost, posts)
  }

  async getPost(id: number): Promise<TPost> {
    const post = await this.postRepo.findOne(id)
    return plainToClass(TPost, post)
  }

  async getPostsByTopicId(topicId: number): Promise<TPost[]> {
    const posts = await this.postRepo.find({
      where: { topicId },
      order: { createdAt: 'ASC' },
    })
    return plainToClass(TPost, posts)
  }

  async getFirstPostByTopicId(topicId: number): Promise<TPost> {
    const posts = await this.postRepo.findOne({
      where: { topicId },
      order: { createdAt: 'ASC' },
    })
    return plainToClass(TPost, posts)
  }

  async createPost(data: IPost): Promise<PostEntity> {
    const createdPost = this.postRepo.save({
      topicId: data.topicId,
      userId: data.userId,
      body: data.body,
    })
    return createdPost
  }

  async deletePosts(topicId: number): Promise<DeleteResult> {
    const deletedPosts = this.postRepo.delete({ topicId })
    return deletedPosts
  }

  async deletePost(postId: number): Promise<DeleteResult> {
    const deletedPost = this.postRepo.delete({ id: postId })
    return deletedPost
  }

  async editPost(data: IEditPost): Promise<PostEntity> {
    const postData = await this.getPost(data.postId)
    if (!postData) throw NotFoundException
    if (postData.userId !== data.userId) throw NotAcceptableException
    const editedPost = await this.postRepo.save({
      id: data.postId,
      body: data.body,
    })
    return editedPost
  }
}
