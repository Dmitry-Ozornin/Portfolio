import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
// import { LoginUserDTO } from './loginUser.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // @Post('login')
  // loginUser(@Body() user: LoginUserDTO) {
  //   return this.appService.login(user);
  // }
}
