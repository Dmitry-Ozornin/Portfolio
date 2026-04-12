import { Body, Controller, Get, Post, Res } from '@nestjs/common'; // 👈 добавьте Res
import { AppService } from './app.service';
import { LoginUserDTO } from './login.user.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  loginUser(@Body() userData: LoginUserDTO, @Res() res: Response) {
    return this.appService.login(userData, res);
  }
}
