import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class ValidatePhoneDto {
  @IsNotEmpty()
  @IsPhoneNumber() // 'any' allows any phone number format
  phoneNumber: string;
}