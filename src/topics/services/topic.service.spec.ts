import { Test } from '@nestjs/testing'
import { PostService } from '../../posts/services/post.service'
import { mockTopic } from '../factories/topic.factory'
import { TopicRepository } from '../repositories/topic.repository'
import { TopicService } from './topic.service'

describe('TopicService', () => {
  let topicService: TopicService
  let postService: PostService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TopicService,
        TopicRepository,
        { provide: PostService, useValue: {} },
      ],
    }).compile()

    topicService = moduleRef.get(TopicService)
    postService = moduleRef.get(PostService)
  })

  describe('getTopics', () => {
    it('should be success', async () => {
      const mockTopics = [
        mockTopic({ id: 11, forumId: 22, userId: 33, name: 'topic10' }),
        mockTopic({ id: 111, forumId: 222, userId: 333, name: 'topic10' }),
        mockTopic({ id: 1111, forumId: 2222, userId: 3333, name: 'topic10' }),
      ]
      TopicRepository.prototype.find = jest.fn().mockReturnValue(mockTopics)
      const result = await topicService.getTopics()
      expect(result).toEqual([
        { id: 11, forumId: 22, userId: 33, name: 'topic10' },
        { id: 111, forumId: 222, userId: 333, name: 'topic10' },
        { id: 1111, forumId: 2222, userId: 3333, name: 'topic10' },
      ])
    })

    it('should be throw error Topics not found', async () => {
      TopicRepository.prototype.find = jest.fn().mockReturnValue([])
      await expect(topicService.getTopics()).rejects.toThrow('Topics not found')
    })
  })

  describe('getTopic', () => {
    it('should be success', async () => {
      TopicRepository.prototype.findOne = jest
        .fn()
        .mockReturnValue(
          mockTopic({ id: 11, forumId: 22, userId: 33, name: 'topic10' }),
        )
      const result = await topicService.getTopic(11)
      expect(result).toEqual({
        id: 11,
        forumId: 22,
        userId: 33,
        name: 'topic10',
      })
    })

    it('should be throw error Topic not found', async () => {
      TopicRepository.prototype.findOne = jest.fn().mockReturnValue(false)
      await expect(topicService.getTopic(1)).rejects.toThrow('Topic not found')
    })
  })

  describe('getTopicsByForumId', () => {
    it('should be throw error Topics not found', async () => {
      TopicRepository.prototype.find = jest.fn().mockReturnValue([])
      await expect(topicService.getTopicsByForumId(1)).rejects.toThrow(
        'Topics not found',
      )
    })
    it('should be success', async () => {
      const mockTopics = [
        mockTopic({ id: 10, forumId: 20, userId: 3, name: 'topic10' }),
      ]
      TopicRepository.prototype.find = jest.fn().mockReturnValue(mockTopics)
      const result = await topicService.getTopicsByForumId(20)
      expect(result).toEqual([
        { id: 10, forumId: 20, userId: 3, name: 'topic10' },
      ])
    })
  })

  describe('deleteTopic', () => {
    it('should be throw error Topic not found', async () => {
      TopicRepository.prototype.findOne = jest.fn()
      await expect(
        topicService.deleteTopic({ topicId: 1234, userId: 3456 })
      ).rejects.toThrow('Topic not found')
    })
    it('should be throw error User not owner', async () => {
      TopicRepository.prototype.findOne = jest.fn().mockReturnValue(
        mockTopic({ userId: 1234 })
      )
      await expect(
        topicService.deleteTopic({ topicId: 1234, userId: 3456 })
      ).rejects.toThrow('User not owner')
    })
    it('should be deleted success', async () => {
      TopicRepository.prototype.findOne = jest.fn().mockReturnValue(
        mockTopic({ userId: 1234 })
      )
      postService.deletePosts = jest.fn()
      TopicRepository.prototype.delete = jest.fn()
      await topicService.deleteTopic({ userId: 1234, topicId: 6543 })
      expect(postService.deletePosts).toBeCalledTimes(1)
      expect(postService.deletePosts).toBeCalledWith(6543)
      expect(TopicRepository.prototype.delete).toBeCalledWith({ id: 6543 })
    })
  })

})
