// src/prisma/prisma.service.ts
import 'dotenv/config';
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    // Настройка пула для Supabase (используем DIRECT_URL для прямой связи)
    const pool = new Pool({
      connectionString: process.env.DIRECT_URL, // Изменено: используем DIRECT_URL
      ssl: {
        rejectUnauthorized: false, // Важно для Supabase
      },
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });

    const adapter = new PrismaPg(pool);

    super({
      adapter,
      log:
        process.env.NODE_ENV === 'development'
          ? ['query', 'info', 'warn', 'error']
          : ['error'],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    try {
      this.logger.log('Connecting to Supabase...');
      await this.$connect();
      this.logger.log('✅ Successfully connected to Supabase');
     
    } catch (error) {
      this.logger.error('Failed to connect to database:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Disconnected from Supabase');
  }
}
