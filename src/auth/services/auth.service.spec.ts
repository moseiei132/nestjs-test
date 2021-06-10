import { JwtService } from "@nestjs/jwt"
import { Test } from "@nestjs/testing"
import { mockUser } from "../../users/factories/user.factory"
import { UserRepository } from "../../users/repositories/user.repository"
import { AuthService } from "./auth.service"
const bcrypt = require('bcrypt')
jest.mock('bcrypt')
describe('AuthService', () => {

    let authService: AuthService
    let jwtService: JwtService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                AuthService,
                UserRepository,
                { provide: JwtService, useValue: {} }
            ]
        }).compile()
        authService = moduleRef.get(AuthService)
        jwtService = moduleRef.get(JwtService)
    })
    describe('login', () => {
        it('should be throw error User does not exist', async () => {
            UserRepository.prototype.findOne = jest.fn()
            await expect(authService.login({ username: 'test', password: 'secret' })).rejects.toThrow('User does not exist')
        })
        it('should be throw error Invalid password', async () => {
            const mockUserData = mockUser({ username: 'test', password: 'secret2' })
            UserRepository.prototype.findOne = jest.fn().mockReturnValue(mockUserData)
            bcrypt.compare = jest.fn().mockImplementation(() => false)
            await expect(authService.login({ username: 'test', password: 'secret' })).rejects.toThrow('Invalid password')
        })
        it('should be success', async () => {
            const mockUserData = mockUser({ id: 1, username: 'test', password: 'secret' })
            UserRepository.prototype.findOne = jest.fn().mockReturnValue(mockUserData)
            bcrypt.compare = jest.fn().mockImplementation(() => true)
            jwtService.sign = jest.fn().mockReturnValue('1234')
            const result = await authService.login({ username: 'test', password: 'secret' })
            expect(result).toEqual({ accessToken: '1234' })

        })
        describe('register', () => {
            it('should be success', async () => {
                const mockUserData = mockUser({ username: 'test', password: 'secret' })
                UserRepository.prototype.save = jest.fn().mockReturnValue(mockUserData)
                bcrypt.hash = jest.fn().mockImplementation(() => 'secret')
                const result = await authService.register({username: 'test', password: 'secret'})
                expect(result).toEqual(mockUserData)
            })
        })
    })
})