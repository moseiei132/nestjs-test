import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToClass } from 'class-transformer'

import { ForumRepository } from '../repositories/forum.repository'
import { TForum } from '../transformers/forum.transformer'

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(ForumRepository)
    private forumRepo: ForumRepository,
  ) {}

  async getForums() {
    const forums = await this.forumRepo.find()
    return plainToClass(TForum, forums)
  }

  async getForum(id: number) {
    const forum = await this.forumRepo.findOne(id)
    return plainToClass(TForum, forum)
  }
}
