import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

import { Response } from 'express';
import {
  EmailAlreadyExistsException,
  InvalidLoginException,
  ResourceNotFoundException,
  UsernameAlreadyExistsException,
} from 'src/models/errors.model';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();

    console.log(exception);

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof ResourceNotFoundException) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    } else if (
      exception instanceof UsernameAlreadyExistsException ||
      exception instanceof EmailAlreadyExistsException ||
      exception instanceof InvalidLoginException
    ) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = typeof res === 'string' ? res : (res as Error).message || message;
    } else {
      // TODO Envoyer à Sentry
      console.log(exception);
    }
    response.status(status).json({ message });
  }
}
