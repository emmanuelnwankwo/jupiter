import { type ExceptionFilter, Catch, type ArgumentsHost, HttpException } from '@nestjs/common'
import { type Request, type Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch (exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    const errorMessage = exception.getResponse()['message'] || exception.message;

    response
      .status(status)
      .json({
        statusCode: status,
        message: errorMessage,
        timestamp: new Date().toISOString(),
        path: request.url
      })
  }
}
