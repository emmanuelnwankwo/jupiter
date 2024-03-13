import { Injectable } from '@nestjs/common'
import { MoviePageMetaDto, type QueryDto } from './dto/query.dto'
import { StarwarsService } from 'src/starwars/starwars.service'
import { Order } from 'src/common/constants/order.enum';
import { GetCharacterResponseDto } from './dto/get-character-response.dto';
import { PageDto } from 'src/common/dtos/page.dto';

@Injectable()
export class CharacterService {
  constructor(private readonly starwarsService: StarwarsService) { }

  async findAll(params: QueryDto): Promise<PageDto<GetCharacterResponseDto>> {
    const { filterByGender, sortBy, order } = params;
    const getCharacterResponseDto: GetCharacterResponseDto[] = [];
    let totalHeight = 0;

    const data = await this.starwarsService.getPeople();

    if (filterByGender) {
      data.results = data.results.filter((item) => item.gender === filterByGender);
    }

    try {
      switch (order) {
        case Order.ASC:
          data.results.sort((a, b) => {
            return a[sortBy].localeCompare(b[sortBy]);
          });
          break;
        case Order.DESC:
          data.results.sort((a, b) => {
            return b[sortBy].localeCompare(a[sortBy]);
          });
          break;
      }
    } catch (error) {

    }

    for (const character of data.results) {
      totalHeight += parseInt(character.height);
      getCharacterResponseDto.push({
        name: character.name,
        height: character.height,
        mass: character.mass,
        gender: character.gender,
      });
    }

    const pageMetaDto = new MoviePageMetaDto({
      itemCount: getCharacterResponseDto.length,
      pageOptionsDto: { take: 10, skip: 0 },
      totalheightInCM: totalHeight + 'cm',
      totalheightInFT: this.convertCmToFtAndInches(totalHeight)
    });

    return new PageDto(getCharacterResponseDto, pageMetaDto);
  }

  private convertCmToFtAndInches(cm: number): string {
    const totalInches = cm * 0.393701;
    let feet = Math.floor(totalInches / 12);
    let inches = Math.round(totalInches % 12);

    if (inches === 12) {
      feet += 1;
      inches = 0;
    }

    return `${feet}ft ${inches}in`;
  }
}
