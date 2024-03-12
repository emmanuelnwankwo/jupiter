import { Controller, Get, Post, Body, Ip, Param, Res, Response, Req, Request, createParamDecorator } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { ApiTags } from '@nestjs/swagger'
import { CommentFactory } from './comment-factory'
import { ApiResponse } from 'src/common/utils/api-response'
// import * as requestIp from 'request-ip';

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
  constructor (
    private readonly commentService: CommentService,
    private readonly commentFactory: CommentFactory) { }

  @Post()
  async create (
    @Req() req: Request,
      @Res({ passthrough: true }) res: Response,
      @Body() createCommentDto: CreateCommentDto,
      @Ip() ipAddress: string): Promise<ApiResponse<any>> {
    console.log('ipAddress', ipAddress)
    console.log('request', JSON.stringify(req.headers, null, 2))

    try {
      const comment = this.commentFactory.createNewComment(createCommentDto, ipAddress)
      const createdComment = await this.commentService.create(comment)
      return ApiResponse.success(createdComment)
    } catch (error) {
      return ApiResponse.error(res, error.message)
    }
  }

  @Get(':movieId')
  async findAll (@Param('movieId') movieId: number, @Ip() ipAddress: string) {
    console.log('ipAddress', ipAddress)
    return await this.commentService.findCommentsByMovieId(movieId)
  }
}

// export const IpAddress = createParamDecorator((data, req) => {
//   if (req.clientIp)
//     return req.clientIp;
//   return requestIp.getClientIp(req);
// });
