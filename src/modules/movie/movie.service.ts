import { Injectable } from '@nestjs/common'
import { StarwarsService } from 'src/starwars/starwars.service'
import { CommentService } from '../comment/comment.service'
import { GetMovieResponseDto } from './dto/get-movie-response.dto'

@Injectable()
export class MovieService {
  constructor (
    private readonly starwarsService: StarwarsService,
    private readonly commentService: CommentService
  ) { }

  async findAll (): Promise<GetMovieResponseDto[]> {
    const movieDto: GetMovieResponseDto[] = [];
    const movies = await this.starwarsService.getFilms()
    for (const movie of movies.results) {
      movieDto.push({
        title: movie.title,
        openingCrawl: movie.opening_crawl,
        releaseDate: movie.release_date,
        commentCount: await this.commentService.getCommentCount(movie.episode_id)
      })
    }
    movieDto.sort((a, b) => {
      return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
    });
    return movieDto
  }

}
