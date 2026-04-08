// create.user.dto.ts
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
  ADMIN = 'ADMIN',
  WORKER = 'WORKER',
  MANAGER = 'MANAGER',
}

export class CreateUserDTO {
  @Length(2, 50)
  @IsString()
  login!: string;
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
// @Length(8, 50)
// @IsString()
// password!: UserRole;
// @IsEnum(UserRole)
// role!: UserRole;
// @IsOptional()
// @IsString()
// workingPosition?: string;

// @Type(() => Date)
// @IsDate()
// dateOfBirth!: Date;
