"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsRepository = void 0;
const common_1 = require("@nestjs/common");
const sqlite3 = require("sqlite3");
const typeorm_1 = require("typeorm");
const create_student_entity_1 = require("../Entity/create-student.entity");
const typeorm_2 = require("@nestjs/typeorm");
let StudentsRepository = class StudentsRepository {
    constructor(repository) {
        this.repository = repository;
        this.dbPath = 'D:/ARC/POC/Database/studDatabase.db';
        this.db = new sqlite3.Database(this.dbPath);
    }
    async getAllStudents() {
        try {
            const studentData = await new Promise((resolve, reject) => {
                this.db.all('SELECT * FROM students', (err, rows) => {
                    if (err) {
                        reject(new Error('Failed to fetch students from the database.'));
                    }
                    else {
                        resolve({ status: 'success', message: 'Students fetched successfully', data: rows });
                    }
                });
            });
            return studentData;
        }
        catch (error) {
            throw { status: 'error', message: error.message };
        }
    }
    async phoneNumberExists(phoneNumber) {
        const query = 'SELECT COUNT(*) as count FROM students WHERE phoneNumber = ?';
        return new Promise((resolve, reject) => {
            this.db.get(query, [phoneNumber], (err, row) => {
                if (err) {
                    reject(new Error('Failed to check phone number existence.'));
                }
                else {
                    const rowCount = row.count;
                    resolve(rowCount > 0);
                }
            });
        });
    }
    async emailExists(email) {
        const query = 'SELECT COUNT(*) as count FROM students WHERE email = ?';
        return new Promise((resolve, reject) => {
            this.db.get(query, [email], (err, row) => {
                if (err) {
                    reject(new Error('Failed to check email existence.'));
                }
                else {
                    const rowCount = row.count;
                    resolve(rowCount > 0);
                }
            });
        });
    }
    async createStudent(createStudentDto) {
        try {
            const students = this.repository.create(createStudentDto);
            const res = await this.repository.save(students);
            return Promise.resolve({ status: 'success', message: 'Student added successfully', data: res });
        }
        catch (error) {
            console.log('Error in the createStudent, repo layer in students module', error);
            return Promise.reject(error);
        }
    }
    async updateStudent(studentID, updateStudentDto) {
        try {
            const result = await this.repository.update(studentID, { ...updateStudentDto });
            if (result.affected === 0) {
                throw new Error('Student not found');
            }
            const updatedStudent = await this.repository.findOne({ where: { studentID } });
            return { status: 'success', message: 'Student updated successfully', data: updatedStudent };
        }
        catch (error) {
            if (error.message === 'Student not found') {
                return { status: 'error', message: 'Students not found' };
            }
            console.log('Error updating student:', error);
            throw error;
        }
    }
    async deleteStudent(studentIDs) {
        try {
            const { studentID } = studentIDs;
            const result = await this.repository.delete(studentID);
            if (result.affected === 0) {
                throw new Error('Students not found');
            }
            return { status: 'success', message: 'Students deleted successfully' };
        }
        catch (error) {
            if (error.message === 'Students not found') {
                return { status: 'error', message: 'Students not found' };
            }
            console.log('Error deleting students:', error);
            throw error;
        }
    }
};
exports.StudentsRepository = StudentsRepository;
exports.StudentsRepository = StudentsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(create_student_entity_1.students)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], StudentsRepository);
//# sourceMappingURL=students.repository.js.map