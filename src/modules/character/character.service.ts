import { Injectable } from '@nestjs/common'
import { type QueryDto } from './dto/query.dto'
import { StarwarsService } from 'src/starwars/starwars.service'

@Injectable()
export class CharacterService {
  constructor (private readonly starwarsService: StarwarsService) {}

  async findAll (params: QueryDto) {
    return await this.starwarsService.getPeople(params)
  }

  findOne (id: number) {
    return `This action returns a #${id} character`
  }
}
