import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Topic } from '../../topics/entities/topic.entity'

@Entity('forums')
export class Forum {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column({ name: 'created_at' })
  createdAt: Date

  @Column({ name: 'updated_at' })
  updatedAt: Date

  @OneToMany(() => Topic, (topic) => topic.forum)
  topics?: Topic[]
}
