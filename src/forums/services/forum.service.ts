import { Injectable, NotFoundException } from '@nestjs/common'
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
    if (forums.length === 0) throw new NotFoundException('Forums not found')
    return plainToClass(TForum, forums)
  }

  async getForum(id: number): Promise<TForum> {
    const forum = await this.forumRepo.findOne(id)
    if (!forum) throw new NotFoundException('Forum not found')
    return plainToClass(TForum, forum)
  }

  async createForum(data: CreateForumDto): Promise<CreateForumDto & Forum> {
    const createdForum = this.forumRepo.save(data)
    return createdForum
  }
}
