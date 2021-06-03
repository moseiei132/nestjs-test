import { Controller, Get, Param, Request, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserService } from "./services/user.service";

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


    


}