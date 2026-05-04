import {
  Injectable,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO, GenderEnum } from './dto/create.user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client-runtime-utils';
import { UserRole } from './dto/create.user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(userData: CreateUserDTO) {
    try {
      const existingLogin = await this.prisma.prisma.user.findUnique({
        where: { login: userData.login },
      });
      const existingEmail = await this.prisma.prisma.user.findUnique({
        where: { email: userData.email },
      });
      const existingPhone = await this.prisma.prisma.user.findUnique({
        where: { phone: userData.phone },
      });

      if (existingLogin) {
        throw new ConflictException({
          statusCode: 409,
          message: `Пользователь с логином "${userData.login}" уже существует`,
          error: 'Conflict',
          field: 'login',
        });
      }
      if (existingEmail) {
        throw new ConflictException({
          statusCode: 409,
          message: `Пользователь с логином "${userData.email}" уже существует`,
          error: 'Conflict',
          field: 'email',
        });
      }
      if (existingPhone) {
        throw new ConflictException({
          statusCode: 409,
          message: `Пользователь с логином "${userData.phone}" уже существует`,
          error: 'Conflict',
          field: 'phone',
        });
      }
      // 1. Хешируем пароль
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      let roleEnum: UserRole;
      switch (userData.role.toUpperCase()) {
        case 'ADMIN':
          roleEnum = UserRole.ADMIN;
          break;
        case 'WORKER':
          roleEnum = UserRole.WORKER;
          break;
        case 'MANAGER':
          roleEnum = UserRole.MANAGER;
          break;

        default:
          roleEnum = UserRole.WORKER; // значение по умолчанию
      }

      let genderEnum: GenderEnum;
      switch (userData.gender) {
        case 'Мужской':
          genderEnum = GenderEnum.MALE;
          break;
        case 'Женский':
          genderEnum = GenderEnum.FEMALE;
          break;
      }

      const user = await this.prisma.prisma.user.create({
        data: {
          login: userData.login,
          password: hashedPassword,
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
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      // 3. Обрабатываем разные типы ошибок
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const target = error.meta?.target as string[];
          const field = target ? target[0] : 'поле';

          let userMessage = '';
          if (field === 'login') {
            userMessage = `Пользователь с логином уже существует`;
          } else if (field === 'email') {
            userMessage = `Пользователь с таким email уже существует`;
          } else if (field === 'phone') {
            userMessage = `Пользователь с таким телефоном уже существует`;
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
      console.log(updatedData);

      if (updatedData.id) {
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

  async getAllUsers(token: string) {
    try {
      // 1. Проверяем токен
      let decodedToken: any;
      try {
        decodedToken = this.jwtService.verify(token);
      } catch (error) {
        throw new UnauthorizedException('Недействительный токен');
      }

      // 2. Проверяем роль
      if (decodedToken.role !== 'ADMIN') {
        throw new ForbiddenException(
          'Доступ запрещен. Требуются права администратора',
        );
      }

      // 3. Получаем всех пользователей
      const users = await this.prisma.prisma.user.findMany({
        select: {
          id: true,
          login: true,
          email: true,
          firstName: true,
          lastName: true,
          patronymic: true,
          role: true,
          gender: true,
          city: true,
          phone: true,
          dateOfBirth: true,
          typeOfWork: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return {
        success: true,
        users: users,
        total: users.length,
      };
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      console.error('Ошибка при получении пользователей:', error);
      throw new InternalServerErrorException(
        'Произошла ошибка при получении пользователей',
      );
    }
  }
}
