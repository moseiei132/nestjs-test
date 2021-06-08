import { EntityRepository, Repository } from 'typeorm'
import { Forum } from '../entities/forum.entity'

@EntityRepository(Forum)
export class ForumRepository extends Repository<Forum> {}
