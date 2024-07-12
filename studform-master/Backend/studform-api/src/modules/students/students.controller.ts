import { Controller, Get, Post, Body, Delete, Inject } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentDto } from './dto/student.dto';
import { ValidatePhoneDto } from './dto/validate-phone.dto';
import { ValidateEmailDto } from './dto/validate-email.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { DeleteStudentDto } from './dto/delete-student.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IStudentsService } from './interfaces/students.interface';


@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(
    @Inject('IStudentsService')
    private readonly studentsService: IStudentsService,
  ) {}


  @ApiOperation({
    summary: "Get All Students",
  })
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

  @ApiOperation({
    summary: "Validate Phone Number",
  })
  @Post('validate-phone')
  public async validatePhoneNumber(
    @Body() validatePhoneDto: ValidatePhoneDto,
  ): Promise<{ exists: boolean }> {
    const exists = await this.studentsService.phoneNumberExists(
      validatePhoneDto.phoneNumber,
    );
    return { exists };
  }

  @ApiOperation({
    summary: "Validate Email",
  })
  @Post('validate-email')
  public async validateEmail(
    @Body() validateEmailDto: ValidateEmailDto,
  ): Promise<{ exists: boolean }> {
    const exists = await this.studentsService.emailExists(
      validateEmailDto.email,
    );
    return { exists };
  }

  @ApiOperation({
    summary: "Add a Student",
  })
  @Post('add-students')
  public async createStudent(
    @Body() body: CreateStudentDto,
  ): Promise<any> {
    try {
      const students = await this.studentsService.createStudent(body);
      return Promise.resolve(students); // Return the resolved promise
    } catch (err) {
      console.log(
        'Error in createStudent, controller layer in students Module',
        err,
      );
      return Promise.reject(err);
    }
  }

  @ApiOperation({
    summary: "Edit Student Details",
  })
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

  @ApiOperation({
    summary: "Delete a Student",
  })
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
