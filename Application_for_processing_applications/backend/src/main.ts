import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';

const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalFilters(new PrismaExceptionFilter());

  app.use(cookieParser());

  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Добавляем глобальный пайп для валидации данных
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 5500);
}
bootstrap();
