import { Controller, Get, Post, Body, Ip, Res, Response, Query } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger'
import { CommentFactory } from './comment-factory'
import { ApiResponse as ApiRes } from 'src/common/utils/api-response'
import { GetCommentResponseDto } from './dto/get-comments.dto'
import { PageOptionsDto } from 'src/common/dtos/page-options.dto'
import { PageDto } from 'src/common/dtos/page.dto'
import { ApiPaginatedResponse } from 'src/common/decorator/api-paginated-response.decorator'

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly commentFactory: CommentFactory) { }

  @Post()
  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({ status: 201, description: 'The comment has been successfully created.', type: CreateCommentDto})
  async create(
    @Res({ passthrough: true }) res: Response,
    @Body() createCommentDto: CreateCommentDto,
    @Ip() ipAddress: string): Promise<ApiRes<any>> {
    console.log('ipAddress', ipAddress)
    try {
      const comment = this.commentFactory.createNewComment(createCommentDto, ipAddress);
      const createdComment = await this.commentService.create(comment);
      return ApiRes.success(createdComment)
    } catch (error) {
      return ApiRes.error(res, error.message)
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments' })
  @ApiPaginatedResponse(GetCommentResponseDto, 'Return all comments')
  async findAll(@Query() pageOptionsDto: PageOptionsDto, @Ip() ipAddress: string): Promise<PageDto<any>> {
    console.log('ipAddress', ipAddress)
    return await this.commentService.getAllComments(pageOptionsDto);
  }
}
