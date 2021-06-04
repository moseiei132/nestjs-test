import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostController } from "./post.controller";
import { PostRepository } from "./repositories/post.repository";
import { PostService } from "./services/post.service";


@Module({
    imports: [TypeOrmModule.forFeature([PostRepository])],
    controllers: [PostController],
    providers: [PostService],
    exports: [PostService]
})
export class PostModule { }
