import { User } from "../entities/user.entity";
import * as faker from 'faker'
export const mockUser = (partial: Partial<User>={}): User => {
    const user: User = {
        id: faker.datatype.number(9999),
        username: faker.random.words(),
        password: faker.random.words(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
    }
    return Object.assign(user, partial)
}