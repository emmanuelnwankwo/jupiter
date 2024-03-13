import { Controller, Get } from '@nestjs/common'
import { MovieService } from './movie.service'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { GetMovieResponseDto } from './dto/get-movie-response.dto'
import { ApiPaginatedResponse } from 'src/common/decorator/api-paginated-response.decorator'
import { PageDto } from 'src/common/dtos/page.dto'

@ApiTags('Movies')
@Controller('movie')
export class MovieController {
  constructor (private readonly movieService: MovieService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch movie list' })
  @ApiPaginatedResponse(GetMovieResponseDto, 'Return all movies')
  async findAll (): Promise<PageDto<any>>  {
    return await this.movieService.findAll()
  }
}
