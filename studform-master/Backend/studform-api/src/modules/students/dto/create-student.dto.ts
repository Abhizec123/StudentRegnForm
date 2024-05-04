import { IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateStudentDto {
  studentID?: number;

  @IsNotEmpty()
  FirstName: string;

  MiddleName?: string;

  @IsNotEmpty()
  LastName: string;

  @IsNotEmpty()
  FullName: string;

  @IsNotEmpty()
  Dob: string;

  @IsNotEmpty()
  Age: number;

  @IsNotEmpty()
  @IsPhoneNumber()
  PhoneNumber: string;

  @IsNotEmpty()
  Address: string;

  @IsNotEmpty()
  @IsEmail()
  Email: string;

  @IsNotEmpty()
  Gender: string;

  @IsNotEmpty()
  Course: string;
}
