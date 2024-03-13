import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { type Comment as IComment } from '../interface/comment.interface'

@Entity({ name: 'comments' })
export class Comment implements IComment {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column({ name: 'movie_id', type: 'int' })
    movieId: number

  @Column({
    length: 500,
    type: 'varchar'
  })
    content: string

  @Column({ name: 'commenter_ip_address', type: 'varchar', length: 15 })
    commenterIpAddress: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP_UTC', name: 'created_date_in_utc' })
    createdDate: Date
}
