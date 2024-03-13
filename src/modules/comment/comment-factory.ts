import { Injectable } from '@nestjs/common'
import { Comment } from '../../core/entities'
import { type CreateCommentDto } from './dto/create-comment.dto'
import { type Comment as IComment } from '../../core/interface/comment.interface'

@Injectable()
export class CommentFactory {
  createNewComment (createCommentDto: CreateCommentDto, ipAddress: string): IComment {
    const newComment = new Comment()
    newComment.movieId = createCommentDto.movieId
    newComment.commenterIpAddress = ipAddress
    newComment.content = createCommentDto.content

    return newComment
  }
}
