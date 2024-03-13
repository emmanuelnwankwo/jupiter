import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Comment } from '../../core/entities/comment.entity'
import { type Comment as IComment } from '../../core/interface/comment.interface'
import { PageOptionsDto } from 'src/common/dtos/page-options.dto'
import { PageDto } from 'src/common/dtos/page.dto'
import { PageMetaDto } from 'src/common/dtos/page-meta.dto'

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment)
  private readonly commentRepository: Repository<Comment>) { }

  async create(comment: Comment): Promise<IComment> {
    return await this.commentRepository.save(comment)
  }

  async findCommentsByMovieId(movieId: number): Promise<IComment[]> {
    return await this.commentRepository.find({ where: { movieId } })
  }

  async getCommentCount(movieId: number): Promise<number> {
    return await this.commentRepository.findAndCount({ where: { movieId } }).then(([comments, count]) => {
      return count
    })
  }

  async getAllComments(pageOptionsDto: PageOptionsDto): Promise<PageDto<IComment>> {
    const queryBuilder = this.commentRepository.createQueryBuilder('comment');
    queryBuilder
      .orderBy('created_date_in_utc', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
