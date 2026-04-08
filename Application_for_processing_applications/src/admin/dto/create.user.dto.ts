import {
  IsString,
  IsEmail,
  IsBoolean,
  IsDate,
  IsOptional,
  Length,
  IsArray,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum UserRole {
  ADMIN = 'admin',
  WORKER = 'worker',
  MANAGER = 'manager',
  DIRECTOR = 'director',
}

export class CreateUserDTO {
  @Length(2, 50, {
    message: 'Имя должно быть не менее 2 и не более 50 символов',
  })
  @IsString({ message: 'Имя должно быть строкой' })
  name: string;

  @Length(2, 50, {
    message: 'Фамилия должна быть не менее 2 и не более 50 символов',
  })
  @IsString({ message: 'Фамилия должна быть строкой' })
  secondName: string;

  @Length(2, 50, {
    message: 'Отчество должно быть не менее 2 и не более 50 символов',
  })
  @IsString({ message: 'Отчество должно быть строкой' })
  patronymic: string;

  @IsEmail({}, { message: 'Некорректный формат электронной почты' })
  email: string;

  @Length(11, 11, { message: 'Номер телефона должен содержать 11 цифр' })
  @IsString({ message: 'Номер телефона должен быть строкой' })
  phone: string;

  @IsBoolean({ message: 'Значение должно быть boolean' })
  isActive: boolean;

  @IsOptional()
  @IsArray({ message: 'typeOfWork должен быть массивом' })
  @IsString({
    each: true,
    message: 'Каждый элемент typeOfWork должен быть строкой',
  })
  typeOfWork?: string[] | null;

  @Length(2, 50, {
    message: 'Название города должно быть не менее 2 и не более 50 символов',
  })
  @IsString({ message: 'Город должен быть строкой' })
  city: string;

  @Length(2, 50, {
    message: 'Логин должен быть не менее 2 и не более 50 символов',
  })
  @IsString({ message: 'Логин должен быть строкой' })
  login: string;

  @Length(2, 50, {
    message: 'Пароль должен быть не менее 2 и не более 50 символов',
  })
  @IsString({ message: 'Пароль должен быть строкой' })
  password: string;

  @IsEnum(UserRole, {
    message: 'Роль должна быть: admin, worker, manager или director',
  })
  role: UserRole;

  @IsOptional()
  @IsString({ message: 'workingPosition должен быть строкой' })
  workingPosition?: string | null;

  @IsOptional()
  @IsArray({ message: 'requestId должен быть массивом' })
  @IsString({ each: true, message: 'Каждый requestId должен быть строкой' })
  requestId?: string[] | null;

  @Type(() => Date)
  @IsDate({ message: 'Некорректный формат даты рождения' })
  dateOfBirth: Date;

  @Type(() => Date)
  @IsOptional()
  @IsDate({ message: 'Некорректный формат даты регистрации' })
  registrationDate?: Date;
}
