import { Body, Controller, Post } from '@nestjs/common';
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
}
