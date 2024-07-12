import { IsNotEmpty, IsEmail, IsPhoneNumber, IsString, IsNumber } from 'class-validator';

export class CreateStudentDto {

  @IsNumber()
  studentID?: number;

  @IsNotEmpty()
  @IsString()
  FirstName: string;

  @IsString()
  MiddleName?: string;

  @IsNotEmpty()
  @IsString()
  LastName: string;

  @IsNotEmpty()
  @IsString()
  FullName: string;

  @IsNotEmpty()
  @IsString()
  Dob: string;

  @IsNotEmpty()
  @IsString()
  Age: number;

  @IsNotEmpty()
  @IsPhoneNumber()
  @IsString()
  PhoneNumber: string;

  @IsNotEmpty()
  @IsString()
  Address: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  Email: string;

  @IsNotEmpty()
  @IsString()
  Gender: string;

  @IsNotEmpty()
  @IsString()
  Course: string;
}
