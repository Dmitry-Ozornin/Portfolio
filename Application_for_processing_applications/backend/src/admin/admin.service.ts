import {
  Injectable,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO, GenderEnum } from './dto/create.user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client-runtime-utils';
import { UserRole } from './dto/create.user.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userData: CreateUserDTO) {
    try {
      const existingUser = await this.prisma.prisma.user.findUnique({
        where: { login: userData.login },
      });

      if (existingUser) {
        throw new ConflictException({
          statusCode: 409,
          message: `Пользователь с логином "${userData.login}" уже существует`,
          error: 'Conflict',
          field: 'login',
        });
      }
      // 1. Хешируем пароль
      // const hashedPassword = await bcrypt.hash(userData.password, 10);
      let roleEnum: UserRole;
      switch (userData.role) {
        case 'ADMIN':
          roleEnum = userData.role as UserRole;
          break;
        case 'WORKER':
          roleEnum = UserRole.WORKER;
          break;
        case 'MANAGER':
          roleEnum = UserRole.MANAGER;
          break;
        case 'USER':
          roleEnum = UserRole.WORKER;
          break;
        default:
          roleEnum = UserRole.WORKER; // значение по умолчанию
      }

      let genderEnum: GenderEnum;
      switch (userData.gender) {
        case 'мужской':
          genderEnum = GenderEnum.MALE;
          break;
        case 'женский':
          genderEnum = GenderEnum.FEMALE;
          break;
      }

      const user = await this.prisma.prisma.user.create({
        data: {
          login: userData.login,
          password: userData.password,
          role: roleEnum,
          gender: genderEnum,
          email: userData.email,
          phone: userData.phone,
          firstName: userData.firstName,
          lastName: userData.lastName,
          patronymic: userData.patronymic,
          typeOfWork: userData.typeOfWork,
          city: userData.city,
          dateOfBirth: userData.dateOfBirth,
        },
      });

      return {
        success: true,
        // message: `Пользователь ${userData.firstName} ${userData.secondName} успешно создан`,
        userId: user.id,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      // 3. Обрабатываем разные типы ошибок
      if (error instanceof PrismaClientKnownRequestError) {
        // Код P2002 - нарушение уникальности
        if (error.code === 'P2002') {
          // Получаем имя поля, которое вызвало конфликт
          const target = error.meta?.target as string[];
          const field = target ? target[0] : 'поле';

          // Формируем понятное сообщение
          let userMessage = '';
          if (field === 'login') {
            userMessage = `Пользователь с логином "${userData.login}" уже существует`;
          } else {
            userMessage = `Пользователь с таким ${field} уже существует`;
          }

          throw new ConflictException({
            statusCode: 409,
            message: userMessage,
            error: 'Conflict',
            field: field,
          });
        }
      }

      // Логируем неожиданную ошибку
      console.error('Ошибка при создании пользователя:', error);

      // Общая ошибка сервера
      throw new InternalServerErrorException(
        'Произошла ошибка при создании пользователя',
      );
    }
  }

  async changeDataOfUser(updatedData: Partial<CreateUserDTO>) {
    try {
      let user;

      if (updatedData.login) {
        user = await this.prisma.prisma.user.findUnique({
          where: { login: updatedData.login },
        });
      } else if (updatedData.email) {
        user = await this.prisma.prisma.user.findUnique({
          where: { email: updatedData.email },
        });
      } else if (updatedData.phone) {
        user = await this.prisma.prisma.user.findUnique({
          where: { phone: updatedData.phone },
        });
      } else if (updatedData.id) {
        user = await this.prisma.prisma.user.findUnique({
          where: { id: updatedData.id },
        });
      }

      if (!user) {
        throw new BadRequestException({
          statusCode: 400,
          message: `Пользователь не найден`,
          error: 'Bad Request',
          field: 'login',
        });
      }
      const updatedUser = await this.prisma.prisma.user.update({
        where: { id: user.id },
        data: { ...updatedData },
      });
      return { success: true, userId: updatedUser.id };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      return error;
    }
  }
}
