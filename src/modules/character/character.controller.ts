import { Controller, Get, Param, ParseBoolPipe, Query } from '@nestjs/common';
import { CharacterService } from './character.service';
import { QueryDto } from './dto/query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Characters')
@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  async findAll(@Query('filterByGender') filterByGender?: string, 
  @Query('sort') sort?: string, 
  @Query('direction') direction: string = 'asc') {
    const params: QueryDto = {
      filterByGender: filterByGender,
      sort: sort,
      direction: direction,
    };
    return this.characterService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characterService.findOne(+id);
  }
}
