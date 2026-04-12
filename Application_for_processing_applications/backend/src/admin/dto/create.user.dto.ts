// USER
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEmail,
  IsDate,
  IsOptional,
  IsArray,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum UserRole {
  ADMIN = 'ADMIN',
  WORKER = 'WORKER',
  MANAGER = 'MANAGER',
}
export enum GenderEnum{
  MALE = "мужской",
  FEMALE = "женский",
}

export class CreateUserDTO {
  id?: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  login: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  @IsEmail()
  email: string;
  @IsString()
  phone: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  role: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  patronymic?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  typeOfWork?: string[];
  @IsString()
  @IsNotEmpty()
  city: string;
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dateOfBirth: Date;
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
// @Length(2, 50)
// @IsString()
// firstName!: string;

// @Length(2, 50)
// @IsString()
// secondName!: string;

// @Length(2, 50)
// @IsString()
// patronymic!: string;

// @IsEmail()
// email!: string;

// @Length(11, 11)
// @IsString()
// phone!: string;

// @IsOptional()
// @IsBoolean()
// isActive?: boolean;

// @IsOptional()
// @IsArray()
// @IsString({ each: true })
// typeOfWork!: string[];

// @Length(2, 50)
// @IsString()
// city!: string;

// @IsOptional()
// @IsString()
// workingPosition?: string;

// @Type(() => Date)
// @IsDate()
// dateOfBirth!: Date;
