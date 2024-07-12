import { Inject, Injectable } from '@nestjs/common';
import { StudentDto } from './dto/student.dto';
import { StudentsRepository } from './repo/students.repository';
import { IStudentsRepository, IStudentsService } from './interfaces/students.interface';
import { CreateStudentDto } from './dto/create-student.dto';
import { students } from './Entity/create-student.entity';
import { DeleteStudentDto } from './dto/delete-student.dto';

@Injectable()
export class StudentsService implements IStudentsService {
  constructor(
    @Inject('IStudentsRepository')
    private readonly StudentsRepository: IStudentsRepository,
  ) {}


  public async getAllStudents(): Promise<StudentDto[] | any> {
    try {
      const res = await this.StudentsRepository.getAllStudents();

      const resDto = res.data.map((item) => {
        return this.mapToStudentDto(item);
      });

      return Promise.resolve({
        status: 'success',
        message: 'Students fetched successfully',
        data: resDto,
      });
    } catch (error) {
      console.log(
        'Error in the getAllStudents, service layer in students module',
        error,
      );
      return Promise.reject(error);
    }
  }

  async phoneNumberExists(phoneNumber: string): Promise<boolean> {
    const numberExists = await this.StudentsRepository.phoneNumberExists(phoneNumber);
    return !!numberExists;
  }

  async emailExists(email: string): Promise<boolean> {
    const emailExists = await this.StudentsRepository.emailExists(email);
    return !!emailExists;
  }

  async createStudent(createStudentDto: CreateStudentDto): Promise<students | any> {
    try {
      const res = await this.StudentsRepository.createStudent(createStudentDto);
      return Promise.resolve(res);

    } catch (error) {
      console.log(
        'Error in the createStudent, service layer in students module',
        error,
      );
      return Promise.reject(error);
    }
  }

  async updateStudent(createStudentDto: CreateStudentDto): Promise<students | any> {
    try {
      const { studentID, ...rest } = createStudentDto;
      const res = await this.StudentsRepository.updateStudent(studentID, rest);
      return Promise.resolve(res);

    } catch (error) {
      console.log(
        'Error in the createStudent, service layer in students module',
        error,
      );
      return Promise.reject(error);
    }
  }

  async deleteStudent(studentIDs: DeleteStudentDto): Promise<students | any> {
    try {
      const res = await this.StudentsRepository.deleteStudent(studentIDs);
      return Promise.resolve(res);

    } catch (error) {
      console.log(
        'Error in the createStudent, service layer in students module',
        error,
      );
      return Promise.reject(error);
    }
  }

  private mapToStudentDto(data: any): StudentDto {
    let result = new StudentDto();

    result.studentID = data.studentID;
    result.FirstName = data.FirstName;
    result.LastName = data.LastName;
    result.MiddleName = data.MiddleName;
    result.FullName = data.FullName;
    result.Dob = data.Dob;
    result.Age = data.Age;
    result.Email = data.Email;
    result.PhoneNumber = data.PhoneNumber;
    result.Address = data.Address;
    result.Gender = data.Gender;
    result.Course = data.Course;

    return result;
  }
}
