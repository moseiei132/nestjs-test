import { PostEntity } from '../entities/post.entity'
import * as faker from 'faker'

export const mockPost = (partial: Partial<PostEntity> = {}): PostEntity => {
  const post: PostEntity = {
    id: faker.datatype.number(9999),
    topicId: faker.datatype.number(9999),
    userId: faker.datatype.number(9999),
    body: faker.random.words(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  }
  return Object.assign(post, partial)
}
