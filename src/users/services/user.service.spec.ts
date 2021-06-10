import { Test } from '@nestjs/testing'
import { mockUser } from '../factories/user.factory'
import { UserRepository } from '../repositories/user.repository'
import { UserService } from './user.service'

describe('UserService', () => {
  let userService: UserService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserRepository, UserService],
    }).compile()
    userService = moduleRef.get(UserService)
  })
  describe('getAllUser', () => {
    it('should be success', async () => {
      const mockUsersData = [mockUser(), mockUser(), mockUser()]
      UserRepository.prototype.find = jest.fn().mockReturnValue(mockUsersData)
      const result = await userService.getAllUser()
      expect(result).toEqual(
        mockUsersData.map((item) => {
          return {
            ...item,
            createdAt: undefined,
            updatedAt: undefined,
            password: undefined,
          }
        }),
      )
    })
    it('should be throw error Users not found', async () => {
      UserRepository.prototype.find = jest.fn().mockReturnValue([])
      await expect(userService.getAllUser()).rejects.toThrow('Users not found')
    })
  })
  describe('getUserInfo', () => {
    it('should be success', async () => {
      const mockUserData = mockUser({ id: 1 })
      UserRepository.prototype.findOne = jest.fn().mockReturnValue(mockUserData)
      const result = await userService.getUserInfo(1)
      expect(result).toEqual({
        ...mockUserData,
        createdAt: undefined,
        updatedAt: undefined,
        password: undefined,
      })
    })
    it('should be throw error User not found', async () => {
      UserRepository.prototype.findOne = jest.fn()
      await expect(userService.getUserInfo(1)).rejects.toThrow('User not found')
    })
  })
  describe('findByUsername', () => {
    it('should be success', async () => {
      const mockUserData = mockUser({ username: 'test' })
      UserRepository.prototype.findOne = jest.fn().mockReturnValue(mockUserData)
      const result = await userService.findByUsername('test')
      expect(result).toEqual({
        ...mockUserData,
        createdAt: undefined,
        updatedAt: undefined,
        password: undefined,
      })
    })
    it('should be throw error User not found', async () => {
      UserRepository.prototype.findOne = jest.fn()
      await expect(userService.findByUsername('test')).rejects.toThrow(
        'User not found',
      )
    })
  })
})
