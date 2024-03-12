import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Comment } from '../../core/entities/comment.entity'
import { type Comment as IComment } from '../../core/interface/comment.interface'

@Injectable()
export class CommentService {
  constructor (@InjectRepository(Comment)
  private readonly commentRepository: Repository<Comment>) { }

  async create (comment: Comment): Promise<IComment> {
    return await this.commentRepository.save(comment)
  }

  async findCommentsByMovieId (movieId: number): Promise<IComment[]> {
    return await this.commentRepository.find({ where: { movieId } })
  }

  async getCommentCount (movieId: number): Promise<number> {
    return await this.commentRepository.findAndCount({ where: { movieId } }).then(([comments, count]) => {
      return count
    })
  }
}
