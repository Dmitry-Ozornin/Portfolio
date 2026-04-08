import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true, // разрешает все источники
    credentials: true,
  });
  // Добавляем глобальный пайп для валидации данных
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Удаляем "лишние" поля из запроса
      forbidNonWhitelisted: true, // Запрещаем запросы с "лишними" полями
    }),
  );
  await app.listen(process.env.PORT ?? 4500);
}
bootstrap();
