import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { PageMetaDto } from "src/common/dtos/page-meta.dto";
import { PageOptionsDto } from "src/common/dtos/page-options.dto";

export enum SortBy {
  NAME = 'name',
  GENDER = 'gender',
  HEIGHT = 'height',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export class QueryDto extends PageOptionsDto {
  @ApiPropertyOptional({ enum: SortBy, default: SortBy.NAME })
  @IsEnum(SortBy)
  @IsOptional()
  readonly sortBy: string

  @ApiPropertyOptional({ enum: Gender })
  @IsEnum(Gender)
  @IsOptional()
  readonly filterByGender?: string
}

export class MoviePageMetaDto extends PageMetaDto {
  @ApiProperty()
  readonly totalheightInCM: string;

  @ApiProperty()
  readonly totalheightInFT: string;

  constructor({ itemCount, pageOptionsDto, totalheightInCM, totalheightInFT }: any) {
    super({ itemCount, pageOptionsDto });
    this.totalheightInCM = totalheightInCM;
    this.totalheightInFT = totalheightInFT;
  }
}