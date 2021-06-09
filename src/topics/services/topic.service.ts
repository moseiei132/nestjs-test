import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToClass } from 'class-transformer'
import { DeleteResult } from 'typeorm'
import { PostService } from '../../posts/services/post.service'
import { Topic } from '../entities/topic.entity'
import { IDeleteTopic, IEditTopic, ITopic } from '../interfaces/topic.interface'
import { TopicRepository } from '../repositories/topic.repository'
import { TTopic } from '../transformers/topic.transformer'

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(TopicRepository)
    private topicRepo: TopicRepository,
    private postService: PostService,
  ) {}

  async getTopics(): Promise<TTopic[]> {
    const topics = await this.topicRepo.find({ order: { createdAt: 'ASC' } })
    if (topics.length === 0) throw new NotFoundException('Topics not found')
    return plainToClass(TTopic, topics)
  }

  async getTopic(id: number): Promise<TTopic> {
    const topic = await this.topicRepo.findOne(id)
    if (!topic) throw new NotFoundException('Topic not found')
    return plainToClass(TTopic, topic)
  }

  async getTopicsByForumId(forumId: number): Promise<TTopic[]> {
    const topics = await this.topicRepo.find({
      where: { forumId },
      order: { createdAt: 'ASC' },
    })
    if (topics.length === 0) throw new NotFoundException('Topics not found')
    return plainToClass(TTopic, topics)
  }

  async createTopic(data: ITopic): Promise<Topic> {
    const createdTopic = await this.topicRepo.save({
      userId: data.userId,
      forumId: data.forumId,
      name: data.name,
    })
    await this.postService.createPost({
      topicId: createdTopic.id,
      userId: data.userId,
      body: data.body,
    })
    return createdTopic
  }

  async deleteTopic(data: IDeleteTopic): Promise<DeleteResult> {
    const topicData = await this.topicRepo.findOne({ id: data.topicId })
    if (!topicData) throw new NotFoundException('Topic not found')
    if (topicData.userId !== data.userId)
      throw new NotAcceptableException('User not owner')
    await this.postService.deletePosts(data.topicId)
    const deletedTopic = await this.topicRepo.delete({ id: data.topicId })
    return deletedTopic
  }

  async editTopic(data: IEditTopic): Promise<Topic> {
    const topicData = await this.topicRepo.findOne({ id: data.topicId })
    if (!topicData) throw new NotFoundException('Topic not found')
    if (topicData.userId !== data.userId)
      throw new NotAcceptableException('User not owner')
    const editedTopic = await this.topicRepo.save({
      id: data.topicId,
      name: data.name,
    })
    const postData = await this.postService.getFirstPostByTopicId(data.topicId)
    await this.postService.editPost({
      postId: postData.id,
      userId: data.userId,
      body: data.body,
    })
    return editedTopic
  }
}
