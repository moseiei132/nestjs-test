import { Test } from "@nestjs/testing"
import { mockPost } from "../factories/post.factory"
import { PostRepository } from "../repositories/post.repository"
import { PostService } from "./post.service"

describe('PostService', () => {
    let postService: PostService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                PostService,
                PostRepository,
            ]
        }).compile()

        postService = moduleRef.get(PostService)
    })

    describe('getPosts', () => {
        it('should be success', async () => {
            const mockPosts = [
                mockPost(),
                mockPost(),
                mockPost(),
            ]
            PostRepository.prototype.find = jest.fn().mockReturnValue(mockPosts)
            const result = await postService.getPosts()
            expect(result).toEqual(mockPosts.map((item) => {
                return { ...item, createdAt: undefined, updatedAt: undefined }
            }))
        })

        it('should be throw error Posts not found', async () => {
            PostRepository.prototype.find = jest.fn().mockReturnValue([])
            await expect(postService.getPosts()).rejects.toThrow('Posts not found')
        })
    })

    describe('getPost', () => {
        it('should be success', async () => {
            const mockPostData = mockPost({ id: 1 })
            PostRepository.prototype.findOne = jest.fn().mockReturnValue(mockPostData)
            const result = await postService.getPost(1)
            expect(result).toEqual({ ...mockPostData, updatedAt: undefined, createdAt: undefined })
        })
        it('should be throw error Post not found', async () => {
            PostRepository.prototype.findOne = jest.fn()
            await expect(postService.getPost(1)).rejects.toThrow('Post not found')
        })
    })

    describe('getPostsByTopicId', () => {
        it('shoud be success', async () => {
            const mockPostsData = [
                mockPost({ topicId: 1 }),
                mockPost({ topicId: 1 }),
                mockPost({ topicId: 1 }),
            ]
            PostRepository.prototype.find = jest.fn().mockReturnValue(mockPostsData)
            const result = await postService.getPostsByTopicId(1)
            expect(result).toEqual(mockPostsData.map((item) => {
                return { ...item, createdAt: undefined, updatedAt: undefined }
            }))
        })
        it('shoud be throw error Posts not found', async () => {
            PostRepository.prototype.find = jest.fn().mockReturnValue([])
            await expect(postService.getPostsByTopicId(1)).rejects.toThrow('Posts not found')
        })
    })
    describe('getFirstPostByTopicId', () => {
        it('shoud be success', async () => {
            const mockPostData = mockPost({ topicId: 1 })
            PostRepository.prototype.findOne = jest.fn().mockReturnValue(mockPostData)
            const result = await postService.getFirstPostByTopicId(1)
            expect(result).toEqual({ ...mockPostData, updatedAt: undefined, createdAt: undefined })
        })
        it('shoud be throw error Post not found', async () => {
            PostRepository.prototype.findOne = jest.fn()
            await expect(postService.getFirstPostByTopicId(1)).rejects.toThrow('Post not found')
        })
    })

    describe('createPost', () => {
        it('should be success', async () => {
            const mockPostData = mockPost({ topicId: 1, userId: 3, body: 'test' })
            PostRepository.prototype.save = jest.fn().mockReturnValue(mockPostData)
            const result = await postService.createPost({ topicId: mockPostData.topicId, userId: mockPostData.userId, body: mockPostData.body })
            expect(result).toEqual(mockPostData)
        })
    })

    describe('deletePosts', () => {
        it('should be success', async () => {
            postService.getPostsByTopicId = jest.fn().mockReturnValue([mockPost(), mockPost(),])
            PostRepository.prototype.delete = jest.fn()
            await postService.deletePosts(1)
            expect(PostRepository.prototype.delete).toBeCalledWith({ topicId: 1 })
        })
        it('should be throw error Posts not found', async () => {
            postService.getPostsByTopicId = jest.fn().mockReturnValue([])
            await expect(postService.deletePosts(1)).rejects.toThrow('Posts not found')
        })
    })

    describe('editPost', () => {
        it('should be success', async () => {
            const mockPostData = mockPost({ id: 1, userId: 3, body: 'test' })
            postService.getPost = jest.fn().mockReturnValue(mockPostData)
            PostRepository.prototype.save = jest.fn().mockReturnValue({ ...mockPostData, body: 'edit' })
            const result = await postService.editPost({ postId: 1, userId: 3, body: 'edit' })
            expect(result).toEqual({ ...mockPostData, body: 'edit' })
        })
        it('should be throw error Post not found', async () => {
            postService.getPost = jest.fn()
           await expect(postService.editPost({ postId: 1, userId: 3, body: 'edit' })).rejects.toThrow('Post not found')
        })
        it('should be throw error User not owner', async () => {
            const mockPostData = mockPost({ id: 1, userId: 4, body: 'test' })
            postService.getPost = jest.fn().mockReturnValue(mockPostData)
            await expect(postService.editPost({ postId: 1, userId: 3, body: 'edit' })).rejects.toThrow('User not owner')
        })
    })

})