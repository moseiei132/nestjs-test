import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToClass } from 'class-transformer'
import { CreateForumDto } from '../dtos/forum.dto'
import { Forum } from '../entities/forum.entity'

import { ForumRepository } from '../repositories/forum.repository'
import { TForum } from '../transformers/forum.transformer'

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(ForumRepository)
    private forumRepo: ForumRepository,
  ) {}

  async getForums(): Promise<TForum[]> {
    const forums = await this.forumRepo.find()
    return plainToClass(TForum, forums)
  }

  async getForum(id: number): Promise<TForum> {
    const forum = await this.forumRepo.findOne(id)
    return plainToClass(TForum, forum)
  }

  async createForum(data: CreateForumDto): Promise<CreateForumDto & Forum> {
    const createdForum = this.forumRepo.save(data)
    return createdForum
  }
}
