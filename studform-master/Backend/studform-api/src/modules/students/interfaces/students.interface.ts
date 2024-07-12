import { StudentDto } from '../dto/student.dto';
import { CreateStudentDto } from '../dto/create-student.dto';
import { students } from '../Entity/create-student.entity';
import { DeleteStudentDto } from '../dto/delete-student.dto';

export interface IStudentsService {
    getAllStudents(): Promise<StudentDto[]>;
    phoneNumberExists(phoneNumber: string): Promise<boolean>;
    emailExists(phoneNumber: string): Promise<boolean>;
    createStudent(createStudentDto: CreateStudentDto): Promise<students | any> 
    updateStudent(createStudentDto: CreateStudentDto): Promise<students | any>
    deleteStudent(studentIDs: DeleteStudentDto): Promise<students | any>
  }

export interface IStudentsRepository {
  getAllStudents(): Promise<any>;
  phoneNumberExists(phoneNumber: string): Promise<boolean>;
  emailExists(phoneNumber: string): Promise<boolean>;
  createStudent(createStudentDto: CreateStudentDto): Promise<students | any> 
  updateStudent(studentID: number, updateStudentDto: CreateStudentDto): Promise<any>
  deleteStudent(studentIDs: DeleteStudentDto): Promise<any>
}

