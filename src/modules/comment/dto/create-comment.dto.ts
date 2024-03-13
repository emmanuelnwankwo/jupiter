import { IsString, IsNotEmpty, IsNumber, MaxLength } from 'class-validator'

export class CreateCommentDto {
  /**
     * Movie id
     * @example 1
     */
  @IsNumber()
  @IsNotEmpty()
  movieId: number

  /**
     * The content of the comment
     * @example 'This is a comment'
     */
  @IsString()
  @IsNotEmpty()
  @MaxLength(500, { message: 'The comment is too long' })
  content: string
}
