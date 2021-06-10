import { Forum } from "../entities/forum.entity";
import * as faker from 'faker'

export const mockForum = (partial: Partial<Forum> = {}): Forum => {
    const forum: Forum = {
        id: faker.datatype.number(9999),
        name: faker.random.words(),
        description: faker.random.words(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
    }
    return Object.assign(forum, partial)
}