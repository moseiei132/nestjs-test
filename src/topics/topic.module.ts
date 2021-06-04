import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TopicRepository } from "./repositories/topic.repository";
import { TopicService } from "./services/topic.service";
import { TopicController } from "./topic.controller";

@Module({
    imports: [TypeOrmModule.forFeature([TopicRepository])],
    controllers: [TopicController],
    providers: [TopicService],
    exports: [TopicService]
})
export class TopicModule{}