import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();
    response.status(status).json({
      status: status,
      data: {
        message: exceptionResponse.error
          ? exceptionResponse.error
          : 'System Error',
        description: exceptionResponse.message
          ? exceptionResponse.message
          : 'System Error',
      },
    });
  }
}
