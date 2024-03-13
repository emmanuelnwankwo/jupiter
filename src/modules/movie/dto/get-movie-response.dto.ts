export class GetMovieResponseDto {
  /**
   * The title of the movie
   */
  title: string
   /**
   * The episode id of the movie
   */
  movieId: number
  /**
   * The opening crawl of the movie
   */
  openingCrawl: string
  /**
   * The release date of the movie
   */
  releaseDate: string
  /**
   * The number of comments for the movie
   */
  commentCount: number
}
