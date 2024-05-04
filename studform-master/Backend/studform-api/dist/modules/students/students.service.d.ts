import { StudentDto } from './dto/student.dto';
import { StudentsRepository } from './repo/students.repository';
import { IStudentsService } from './students.interface';
import { CreateStudentDto } from './dto/create-student.dto';
import { students } from './Entity/create-student.entity';
import { DeleteStudentDto } from './dto/delete-student.dto';
export declare class StudentsService implements IStudentsService {
    private readonly StudentsRepository;
    constructor(StudentsRepository: StudentsRepository);
    getAllStudents(): Promise<StudentDto[] | any>;
    phoneNumberExists(phoneNumber: string): Promise<boolean>;
    emailExists(email: string): Promise<boolean>;
    createStudent(createStudentDto: CreateStudentDto): Promise<students | any>;
    updateStudent(createStudentDto: CreateStudentDto): Promise<students | any>;
    deleteStudent(studentIDs: DeleteStudentDto): Promise<students | any>;
    private mapToStudentDto;
}
