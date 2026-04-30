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
      console.log(isValidPassword);

      const token = this.jwtService.sign({
        id: user.id,
        login: user.login,
        role: user.role,
        firstName: user.firstName,
      });

      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
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
          firstName: user.firstName,
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
  

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}
