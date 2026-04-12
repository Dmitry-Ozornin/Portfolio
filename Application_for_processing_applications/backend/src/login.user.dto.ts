import { IsString, MinLength } from 'class-validator';

export class LoginUserDTO {
  @IsString()
  @MinLength(5)
  login: string;
  @IsString()
  @MinLength(5)
  password: string;
}
