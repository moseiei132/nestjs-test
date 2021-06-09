import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostModule } from '../posts/post.module'
import { TopicRepository } from './repositories/topic.repository'
import { TopicService } from './services/topic.service'
import { TopicController } from './topic.controller'

@Module({
  imports: [TypeOrmModule.forFeature([TopicRepository]), PostModule],
  controllers: [TopicController],
  providers: [TopicService],
  exports: [TopicService],
})
export class TopicModule {}
