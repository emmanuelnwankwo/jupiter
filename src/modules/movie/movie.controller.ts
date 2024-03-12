import { Controller, Get } from '@nestjs/common'
import { MovieService } from './movie.service'
import { ApiTags } from '@nestjs/swagger'
import { ApiResponse } from 'src/common/utils/api-response'

@ApiTags('Movies')
@Controller('movie')
export class MovieController {
  constructor (private readonly movieService: MovieService) {}

  @Get()
  async findAll (): Promise<any> {
    return await this.movieService.findAll()
  }
}
