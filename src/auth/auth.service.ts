import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/repositories/user.repository';
import { CreateUserDto } from 'src/users/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(UserRepository)
        private userRepo: UserRepository
    ) { }
    // async validateUser(username: string, pass: string): Promise<any> {
    //     const user = await this.userRepo.findOne({username: username});
    //     if (user) {
    //         const isMatch = await bcrypt.compare(pass, user.password);
    //         if(!isMatch) return null;
    //         const { password, ...result } = user;
    //         return result;
    //     }
    //     return null;
    // }

    async login(data: LoginDto) {
        const { username, password } = data
        // access_token: this.jwtService.sign(payload),
        const user = await this.userRepo.findOne({ username });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new UnauthorizedException('Invalid password')
            }
            return {accessToken: this.jwtService.sign({id: user.id, username})}
        }
        throw new UnauthorizedException('USER DOES NOT EXIST')
    }

    async register(data: CreateUserDto) {
        // console.log(`${data.username} ${data.password} `);
        data.password = await bcrypt.hash(data.password, 10);
        return this.userRepo.save(data);
    }
}
