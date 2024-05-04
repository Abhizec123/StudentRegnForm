import { IStudentsRepository } from '../students.interface';
import * as sqlite3 from 'sqlite3';
import { CreateStudentDto } from '../dto/create-student.dto';
import { Repository } from 'typeorm';
import { students } from '../Entity/create-student.entity';
import { DeleteStudentDto } from '../dto/delete-student.dto';
export declare class StudentsRepository implements IStudentsRepository {
    private readonly repository;
    dbPath: string;
    db: sqlite3.Database;
    constructor(repository: Repository<students>);
    getAllStudents(): Promise<any>;
    phoneNumberExists(phoneNumber: string): Promise<boolean>;
    emailExists(email: string): Promise<boolean>;
    createStudent(createStudentDto: CreateStudentDto): Promise<students | any>;
    updateStudent(studentID: number, updateStudentDto: CreateStudentDto): Promise<any>;
    deleteStudent(studentIDs: DeleteStudentDto): Promise<any>;
}
