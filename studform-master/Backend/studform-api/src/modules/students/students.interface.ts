import { StudentDto } from './dto/student.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { students } from './Entity/create-student.entity';

export interface IStudentsService {
    getAllStudents(): Promise<StudentDto[]>;
    phoneNumberExists(phoneNumber: string): Promise<boolean>;
    emailExists(phoneNumber: string): Promise<boolean>;
    createStudent(createStudentDto: CreateStudentDto): Promise<students | any>
  }

export interface IStudentsRepository {
  getAllStudents(): Promise<any>;
  phoneNumberExists(phoneNumber: string): Promise<boolean>;
  emailExists(phoneNumber: string): Promise<boolean>;
  createStudent(createStudentDto: CreateStudentDto): Promise<students | any>
}

