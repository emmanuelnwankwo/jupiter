import { StatusCode } from '../constants/status-code'

export class ApiResponse<TData> {
  public readonly statusCode: number

  public readonly message: string

  public readonly data: TData | null

  private constructor (statusCode: number, message: string, data?: TData) {
    this.statusCode = statusCode
    this.message = message
    this.data = data
  }

  public static success<TData>(data?: TData, message?: string): ApiResponse<TData> {
    const resultCode: number = StatusCode.SUCCESS.code
    const resultMessage: string = message || StatusCode.SUCCESS.message

    return new ApiResponse(resultCode, resultMessage, data)
  }

  public static error<TData>(res: any, message: string, statusCode?: number, data?: TData): ApiResponse<TData> {
    const resultCode: number = statusCode || StatusCode.INTERNAL_SERVER_ERROR.code
    const resultMessage: string = message || StatusCode.INTERNAL_SERVER_ERROR.message

    return res.status(resultCode).json(new ApiResponse(resultCode, resultMessage, data))
    // return new ApiResponse(resultCode, resultMessage, data);
    // throw new HttpException('', resultCode);
  }
}
