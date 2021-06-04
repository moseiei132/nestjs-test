import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ForumController } from "./forum.controller";
import { ForumRepository } from "./repositories/forum.repository";
import { ForumService } from "./services/forum.service";

@Module({
    imports: [TypeOrmModule.forFeature([ForumRepository])],
    controllers: [ForumController],
    providers: [ForumService],
    exports: [ForumService]
})
export class ForumModule { }
