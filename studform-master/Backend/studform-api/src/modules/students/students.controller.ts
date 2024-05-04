import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentDto } from './dto/student.dto';
import { ValidatePhoneDto } from './dto/validate-phone.dto';
import { ValidateEmailDto } from './dto/validate-email.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { DeleteStudentDto } from './dto/delete-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  public async getAllStudents(): Promise<StudentDto[]> {
    try {
      const students = await this.studentsService.getAllStudents();
      return Promise.resolve(students); // Return the resolved promise
    } catch (err) {
      console.log(
        'Error in getAllStudents, controller layer in students Module',
        err,
      );
      return Promise.reject(err);
    }
  }

  @Post('validate-phone')
  public async validatePhoneNumber(
    @Body() validatePhoneDto: ValidatePhoneDto,
  ): Promise<{ exists: boolean }> {
    const exists = await this.studentsService.phoneNumberExists(
      validatePhoneDto.phoneNumber,
    );
    return { exists };
  }

  @Post('validate-email')
  public async validateEmail(
    @Body() validateEmailDto: ValidateEmailDto,
  ): Promise<{ exists: boolean }> {
    const exists = await this.studentsService.emailExists(
      validateEmailDto.email,
    );
    return { exists };
  }

  @Post('add-students')
  public async createStudent(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<void> {
    try {
      const students = await this.studentsService.createStudent(createStudentDto);
      return Promise.resolve(students); // Return the resolved promise
    } catch (err) {
      console.log(
        'Error in createStudent, controller layer in students Module',
        err,
      );
      return Promise.reject(err);
    }
  }

  @Post('edit-students')
  public async updateStudent(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<void> {
    try {
      const students = await this.studentsService.updateStudent(createStudentDto);
      return Promise.resolve(students); // Return the resolved promise
    } catch (err) {
      console.log(
        'Error in createStudent, controller layer in students Module',
        err,
      );
      return Promise.reject(err);
    }
  }

  @Post('delete-students')
  public async deleteStudent(
    @Body() body: DeleteStudentDto,
  ): Promise<void> {
    try {
      const students = await this.studentsService.deleteStudent(body);
      return Promise.resolve(students); // Return the resolved promise
    } catch (err) {
      console.log(
        'Error in createStudent, controller layer in students Module',
        err,
      );
      return Promise.reject(err);
    }
  }

}
