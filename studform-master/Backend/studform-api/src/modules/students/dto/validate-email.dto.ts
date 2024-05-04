import { IsNotEmpty, IsEmail } from 'class-validator';

export class ValidateEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}