// src/prisma/prisma.service.ts
import 'dotenv/config';
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const {
  PrismaClient,
} = require('c:/work/portfolio/Application_for_processing_applications/backend/prisma/generated/prisma');

@Injectable()
export class PrismaService {
  public prisma: any;
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

    this.prisma = new PrismaClient({
      adapter,
      log:
        process.env.NODE_ENV === 'development'
          ? ['query', 'info', 'warn', 'error']
          : ['error'],
    });
  }

  async onModuleInit() {
    try {
      this.logger.log('Connecting to Supabase...');
      await this.prisma.$connect();
      this.logger.log('✅ Successfully connected to Supabase');
    } catch (error) {
      this.logger.error('Failed to connect to database:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
    this.logger.log('Disconnected from Supabase');
  }
}
