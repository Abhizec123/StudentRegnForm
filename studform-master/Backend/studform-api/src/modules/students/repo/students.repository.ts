import { Injectable } from '@nestjs/common';
import { IStudentsRepository } from '../students.interface';
import * as sqlite3 from 'sqlite3';
import { CreateStudentDto } from '../dto/create-student.dto';
import { Repository} from 'typeorm';
import { students } from '../Entity/create-student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteStudentDto } from '../dto/delete-student.dto';

@Injectable()
export class StudentsRepository implements IStudentsRepository {

  dbPath = 'D:/ARC/POC/Database/studDatabase.db';
  db: sqlite3.Database;

  constructor(
    @InjectRepository(students)
    private readonly repository: Repository<students>
  ) {
    this.db = new sqlite3.Database(this.dbPath);
  }

  async getAllStudents(): Promise<any> {
    try {
      const studentData = await new Promise((resolve, reject) => {
        this.db.all('SELECT * FROM students', (err, rows) => {
          if (err) {
            reject(new Error('Failed to fetch students from the database.'));
          } else {
            resolve({ status: 'success', message: 'Students fetched successfully', data: rows });
          }
        });
      });

      return studentData;
    } catch (error) {
      throw { status: 'error', message: error.message };
    }
  }

  async phoneNumberExists(phoneNumber: string): Promise<boolean> {
    const query = 'SELECT COUNT(*) as count FROM students WHERE phoneNumber = ?';
    return new Promise((resolve, reject) => {
      this.db.get(query, [phoneNumber], (err, row) => {
        if (err) {
          reject(new Error('Failed to check phone number existence.'));
        } else {
          // Use type assertion to tell TypeScript that row is of type { count: number }
          const rowCount = (row as { count: number }).count;
          resolve(rowCount > 0);
        }
      });
    });
  }

  async emailExists(email: string): Promise<boolean> {
    const query = 'SELECT COUNT(*) as count FROM students WHERE email = ?';
    return new Promise((resolve, reject) => {
      this.db.get(query, [email], (err, row) => {
        if (err) {
          reject(new Error('Failed to check email existence.'));
        } else {
          // Use type assertion to tell TypeScript that row is of type { count: number }
          const rowCount = (row as { count: number }).count;
          resolve(rowCount > 0);
        }
      });
    });
  }

  async createStudent(createStudentDto: CreateStudentDto): Promise<students | any> {
    try {
      const students = this.repository.create(createStudentDto);
      const res = await this.repository.save(students);
      return Promise.resolve({ status: 'success', message: 'Student added successfully', data: res })
    } catch (error) {
      console.log(
        'Error in the createStudent, repo layer in students module',
        error,
      );
      return Promise.reject(error);
    }
  }

  async updateStudent(studentID: number, updateStudentDto: CreateStudentDto): Promise<any> {
    try {
      const result = await this.repository.update(studentID, { ...updateStudentDto });
      if (result.affected === 0) {
        throw new Error('Student not found');
      }
      const updatedStudent = await this.repository.findOne( { where: { studentID } });
      return { status: 'success', message: 'Student updated successfully', data: updatedStudent };
    } catch (error) {
      if (error.message === 'Student not found') {
        return { status: 'error', message: 'Students not found' };
      }
      console.log('Error updating student:', error);
      throw error;
    }
  }  

  async deleteStudent(studentIDs: DeleteStudentDto): Promise<any> {
    try {
      const { studentID } = studentIDs;
      const result = await this.repository.delete(studentID);
  
      if (result.affected === 0) {
        throw new Error('Students not found');
      }
  
      return { status: 'success', message: 'Students deleted successfully' };
    } catch (error) {
      if (error.message === 'Students not found') {
        return { status: 'error', message: 'Students not found' };
      }
      console.log('Error deleting students:', error);
      throw error;
    }
  }
}
