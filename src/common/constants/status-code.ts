import { HttpStatus } from '@nestjs/common'

export interface CodeDescription {
  code: number
  message: string
}

export class StatusCode {
  public static SUCCESS: CodeDescription = {
    code: HttpStatus.OK,
    message: 'Success.'
  }

  public static BAD_REQUEST_ERROR: CodeDescription = {
    code: HttpStatus.BAD_REQUEST,
    message: 'Bad request.'
  }

  public static INTERNAL_SERVER_ERROR: CodeDescription = {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal Server Error.'
  }
}
