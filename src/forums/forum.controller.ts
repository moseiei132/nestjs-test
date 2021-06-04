import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { ForumRepository } from "./repositories/forum.repository";

@ApiTags('forumController')
@Controller('forum')
export class ForumController{
    constructor(
        @InjectRepository(ForumRepository)
        private forumRepo: ForumRepository
    ){}

    @Get()
    getForum(){
        return this.forumRepo.find({relations: ['topics']});
    }
}