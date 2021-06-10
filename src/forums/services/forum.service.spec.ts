import { Test } from '@nestjs/testing'
import { mockForum } from '../factories/forum.factory'
import { ForumRepository } from '../repositories/forum.repository'
import { ForumService } from './forum.service'

describe('ForumService', () => {
  let forumService: ForumService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ForumRepository, ForumService],
    }).compile()
    forumService = moduleRef.get(ForumService)
  })
  describe('getForums', () => {
    it('should be success', async () => {
      const mockForumsData = [mockForum(), mockForum()]
      ForumRepository.prototype.find = jest.fn().mockReturnValue(mockForumsData)
      const result = await forumService.getForums()
      expect(result).toEqual(
        mockForumsData.map((item) => {
          return { ...item, createdAt: undefined, updatedAt: undefined }
        }),
      )
    })
    it('should be throw error not found', async () => {
      ForumRepository.prototype.find = jest.fn().mockReturnValue([])
      await expect(forumService.getForums()).rejects.toThrow('Forums not found')
    })
  })
  describe('getForum', () => {
    it('should be success', async () => {
      const mockForumData = mockForum({ id: 1 })
      ForumRepository.prototype.findOne = jest
        .fn()
        .mockReturnValue(mockForumData)
      const result = await forumService.getForum(1)
      expect(result).toEqual({
        ...mockForumData,
        createdAt: undefined,
        updatedAt: undefined,
      })
    })
    it('should be throw error not found', async () => {
      ForumRepository.prototype.findOne = jest.fn()
      await expect(forumService.getForum(1)).rejects.toThrow('Forum not found')
    })
  })
  describe('createForum', () => {
    it('should be success', async () => {
      const mockForumData = mockForum({ name: 'test', description: 'test' })
      ForumRepository.prototype.save = jest.fn().mockReturnValue(mockForumData)
      const result = await forumService.createForum({
        name: 'test',
        description: 'test',
      })
      expect(result).toEqual(mockForumData)
    })
  })
})
