import { first } from 'rxjs';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginUserDTO } from './login.user.dto';
import { Response, Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  async loginUser(@Body() userData: LoginUserDTO, @Res() res: Response) {
    const result = await this.appService.login(userData, res);
    return res.json(result);
  }

  @Get('me')
  async getMe(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies['token'];

    if (!token) {
      return res.status(401).json({ error: 'Нет токена' });
    }

    try {
      const payload = this.appService.verifyToken(token);
      return res.json({
        id: payload.id,
        login: payload.login,
        role: payload.role,
        firstName: payload.firstName,
      });
    } catch (error) {
      return res.status(401).json({ error: 'Неверный или истекший токен' });
    }
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.cookie('token', '', {
      httpOnly: true,
      maxAge: 0,
      path: '/',
    });
    return res.json({ success: true });
  }
}
