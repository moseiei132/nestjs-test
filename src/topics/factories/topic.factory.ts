import { Topic } from "../entities/topic.entity"
import * as faker from "faker"

export const mockTopic = (partial: Partial<Topic>=undefined) => {
    const topic: Topic = {
        id: faker.datatype.number(9999),
        forumId: faker.datatype.number(9999),
        userId: faker.datatype.number(9999),
        name: faker.random.words(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past()
    }
    return Object.assign(topic, partial)

    
}