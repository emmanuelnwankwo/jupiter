import { Controller, Get, Query } from '@nestjs/common';
import { CharacterService } from './character.service';
import { QueryDto } from './dto/query.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/common/decorator/api-paginated-response.decorator';
import { GetCharacterResponseDto } from './dto/get-character-response.dto';

@ApiTags('Characters')
@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) { }

  @Get()
  @ApiOperation({ summary: 'Get movie character list' })
  @ApiPaginatedResponse(GetCharacterResponseDto, 'Return all characters')
  async findAll(
    @Query() queryDto: QueryDto): Promise<any> {

    return this.characterService.findAll(queryDto);
  }

}
