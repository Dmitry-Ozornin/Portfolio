import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDTO } from './login.user.dto';
import { PrismaService } from './prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userData: LoginUserDTO, res: Response) {
    try {
      if (!userData.login || !userData.password) {
        throw new BadRequestException({
          statusCode: 400,
          message: `Логин и пароль обязательны`,
          error: 'Bad Request',
        });
      }

      const user = await this.prisma.prisma.user.findUnique({
        where: { login: userData.login },
      });

      console.log(user);

      if (!user) {
        throw new UnauthorizedException('Неверный логин или пароль');
      }

      const isValidPassword = await bcrypt.compare(
        userData.password,
        user.password,
      );

      if (!isValidPassword) {
        throw new UnauthorizedException('Неверный логин или пароль');
      }

      // Генерируем JWT токен
      const token = this.jwtService.sign({
        id: user.id,
        login: user.login,
        role: user.role,
      });

      // Устанавливаем httpOnly cookie
      res.cookie('token', token, {
        httpOnly: true, // Защита от XSS — JavaScript не прочитает
        secure: process.env.NODE_ENV === 'production', // только HTTPS в проде
        sameSite: 'lax', // Защита от CSRF
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/',
      });

      return {
        success: true,
        message: 'Успешный вход',
        user: {
          id: user.id,
          login: user.login,
          role: user.role,
        },
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }
      console.error('Login error:', error);
      throw new InternalServerErrorException(
        'Произошла ошибка. Сервер временно недоступен или ведутся технические работы',
      );
    }
  }
}
