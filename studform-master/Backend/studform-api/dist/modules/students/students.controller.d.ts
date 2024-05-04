import { StudentsService } from './students.service';
import { StudentDto } from './dto/student.dto';
import { ValidatePhoneDto } from './dto/validate-phone.dto';
import { ValidateEmailDto } from './dto/validate-email.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { DeleteStudentDto } from './dto/delete-student.dto';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    getAllStudents(): Promise<StudentDto[]>;
    validatePhoneNumber(validatePhoneDto: ValidatePhoneDto): Promise<{
        exists: boolean;
    }>;
    validateEmail(validateEmailDto: ValidateEmailDto): Promise<{
        exists: boolean;
    }>;
    createStudent(createStudentDto: CreateStudentDto): Promise<void>;
    updateStudent(createStudentDto: CreateStudentDto): Promise<void>;
    deleteStudent(body: DeleteStudentDto): Promise<void>;
}
