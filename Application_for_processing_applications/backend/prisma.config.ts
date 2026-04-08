// prisma.config.ts
import { defineConfig, env } from 'prisma/config';
import 'dotenv/config'; // Обязательно для загрузки переменных из .env

export default defineConfig({
  // Указываем, где лежит схема (по умолчанию и так здесь, но можно явно)
  schema: 'prisma/schema.prisma',

  // !!! ОСНОВНОЕ ИЗМЕНЕНИЕ !!!
  // Теперь datasource определяется здесь, а НЕ в конструкторе PrismaClient
  datasource: {
    url: env('DIRECT_URL'), // Prisma сам подставит значение из переменных окружения
  },

  // Опционально: настройка путей для миграций
  migrations: {
    path: 'prisma/migrations',
  },
});
