import { EntityRepository, Repository } from 'typeorm'
import { User } from '../entities/user.entity'

@EntityRepository(User) //entity name
export class UserRepository extends Repository<User> {}
