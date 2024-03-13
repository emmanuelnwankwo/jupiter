export class GetCommentResponseDto {
    /**
    * The id of the comment
    */
    public id: string
    /**
    * The movie id
    */
    public movieId: number
    /**
    * The content of the comment
    */
    public content: string
    /**
    * The date the comment was created
    */
    public dateCreated: string
    /**
    * The IP address of the commenter
    */
    public commenterIpAddress: string
}
