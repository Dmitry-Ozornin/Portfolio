import { Body, Controller, Get, Post, Req, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create.user.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('createUser')
  createUser(@Body() user: CreateUserDTO) {
    // Логика создания пользователя

    return this.adminService.createUser(user);
  }
  @Post('updateUser')
  updateUser(@Body() updatedData: Partial<CreateUserDTO>) {
    // Логика обновления данных пользователя
    return this.adminService.changeDataOfUser(updatedData);
  }

  @Get('users')
  async getAllUsers(@Req() req: any) {
    const token = req.cookies?.token;

    if (!token) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Токен не предоставлен',
        error: 'Unauthorized',
      });
    }

    return this.adminService.getAllUsers(token);
  }
}
