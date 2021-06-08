import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToClass } from 'class-transformer'
import { TopicRepository } from '../repositories/topic.repository'
import { TTopic } from '../transformers/topic.transformer'

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(TopicRepository)
    private topicRepo: TopicRepository,
  ) {}

  async getTopics() {
    const topics = await this.topicRepo.find({ order: { createdAt: 'ASC' } })
    return plainToClass(TTopic, topics)
  }

  async getTopic(id: number) {
    const topic = await this.topicRepo.findOne(id)
    return plainToClass(TTopic, topic)
  }

  async getTopicsByForumId(forumId: number) {
    const topics = await this.topicRepo.find({
      where: { forumId },
      order: { createdAt: 'ASC' },
    })
    return plainToClass(TTopic, topics)
  }
}
