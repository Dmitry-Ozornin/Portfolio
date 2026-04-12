// src/filters/prisma-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client-runtime-utils';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Ошибка базы данных';

    switch (exception.code) {
      case 'P2002': // Уникальность
        status = HttpStatus.CONFLICT;
        const field = (exception.meta?.target as string[])?.[0];
        message = `Запись с таким ${field} уже существует`;
        break;
      case 'P2003': // Внешний ключ
        status = HttpStatus.BAD_REQUEST;
        message = 'Связанная запись не найдена';
        break;
      case 'P2025': // Не найдено
        status = HttpStatus.NOT_FOUND;
        message = 'Запись не найдена';
        break;
    
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      error: exception.code,
      timestamp: new Date().toISOString(),
    });
  }
}
