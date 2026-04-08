import { Injectable } from '@nestjs/common';
// import { LoginUserDTO } from './loginUser.dto';

@Injectable()
export class AppService {
  login(user: any): string {
    return `${user.login}  ${user.password}`;
  }
}
