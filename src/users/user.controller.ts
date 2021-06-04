import { Controller, Get, Param, Req, Request, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User } from "./entities/user.entity";
import { UserService } from "./services/user.service";
import {UseUser} from "../common/decorators/user.decorator"
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@ApiTags('UserController')
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Get()
    getAllUser() {
        return this.userService.getAllUser();
    }

    @Get('/:id')
    getUserInfo(@Param('id') id: number) {
        return this.userService.getUserInfo(id);
    }

    @Get('findByUsername/:username')
    findByEmail(@Param('username') username: string) {
        return this.userService.findByUsername(username);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('info')
    getInfo(@Req() req: any){
        return req.user;
    }

    


}