import {
  Injectable,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from './dto/create.user.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userData: CreateUserDTO) {
    
    try {
      // 1. Хешируем пароль
      // const hashedPassword = await bcrypt.hash(userData.password, 10);

      // 2. Создаем пользователя
      const user = await this.prisma.user.create({
        data: {
    
          login: userData.login,
  
        },
      });

      return {
        success: true,
        // message: `Пользователь ${userData.firstName} ${userData.secondName} успешно создан`,
        userId: user.id,
      };
    } catch (error) {
      // 3. Обрабатываем разные типы ошибок

      // Логируем неожиданную ошибку
      console.error('Ошибка при создании пользователя:', error);

      // Общая ошибка сервера
      throw new InternalServerErrorException(
        'Произошла ошибка при создании пользователя',
      );
    }
  }
}
