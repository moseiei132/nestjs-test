import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateUserDto } from "src/users/create-user.dto";
import { LoginDto } from "./dtos/auth.dto";
import { AuthService } from "./services/auth.service";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}

    @Post('login')
    async login(@Body() data: LoginDto) {
        return this.authService.login(data);
    }


    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request()req){
        return req.user;
    }


    @Post('register')
    register(@Body() data: CreateUserDto) {
        return this.authService.register(data);
    }

    
}