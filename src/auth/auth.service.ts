import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/repositories/user.repository';
import { CreateUserDto } from 'src/users/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(UserRepository)
        private userRepo: UserRepository
    ) { }
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userRepo.findOne({username: username});
        if (user) {
            const isMatch = await bcrypt.compare(pass, user.password);
            if(!isMatch) return null;
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(data: CreateUserDto){
        // console.log(`${data.username} ${data.password} `);
        data.password = await bcrypt.hash(data.password, 10);
        return this.userRepo.save(data);
    }
}
