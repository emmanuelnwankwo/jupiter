import { Injectable } from '@nestjs/common'
import { StarwarsService } from 'src/starwars/starwars.service'
import { CommentService } from '../comment/comment.service'
import { GetMovieResponseDto } from './dto/get-movie-response.dto'
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageDto } from 'src/common/dtos/page.dto';

@Injectable()
export class MovieService {
  constructor (
    private readonly starwarsService: StarwarsService,
    private readonly commentService: CommentService
  ) { }

  async findAll (): Promise<PageDto<GetMovieResponseDto>> {
    const movieDto: GetMovieResponseDto[] = [];
    const movies = await this.starwarsService.getFilms();
    for (const movie of movies.results) {
      movieDto.push({
        title: movie.title,
        movieId: movie.episode_id,
        openingCrawl: movie.opening_crawl,
        releaseDate: movie.release_date,
        commentCount: await this.commentService.getCommentCount(movie.episode_id)
      })
    }
    movieDto.sort((a, b) => {
      return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
    });
    const pageMetaDto = new PageMetaDto({ itemCount: movieDto.length, pageOptionsDto: { take: 10, skip: 0 }});

    return new PageDto(movieDto, pageMetaDto);
  }

}
