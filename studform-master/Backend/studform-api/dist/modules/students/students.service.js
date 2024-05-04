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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const student_dto_1 = require("./dto/student.dto");
const students_repository_1 = require("./repo/students.repository");
let StudentsService = class StudentsService {
    constructor(StudentsRepository) {
        this.StudentsRepository = StudentsRepository;
    }
    async getAllStudents() {
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
        }
        catch (error) {
            console.log('Error in the getAllStudents, service layer in students module', error);
            return Promise.reject(error);
        }
    }
    async phoneNumberExists(phoneNumber) {
        const numberExists = await this.StudentsRepository.phoneNumberExists(phoneNumber);
        return !!numberExists;
    }
    async emailExists(email) {
        const emailExists = await this.StudentsRepository.emailExists(email);
        return !!emailExists;
    }
    async createStudent(createStudentDto) {
        try {
            const res = await this.StudentsRepository.createStudent(createStudentDto);
            return Promise.resolve(res);
        }
        catch (error) {
            console.log('Error in the createStudent, service layer in students module', error);
            return Promise.reject(error);
        }
    }
    async updateStudent(createStudentDto) {
        try {
            const { studentID, ...rest } = createStudentDto;
            const res = await this.StudentsRepository.updateStudent(studentID, rest);
            return Promise.resolve(res);
        }
        catch (error) {
            console.log('Error in the createStudent, service layer in students module', error);
            return Promise.reject(error);
        }
    }
    async deleteStudent(studentIDs) {
        try {
            const res = await this.StudentsRepository.deleteStudent(studentIDs);
            return Promise.resolve(res);
        }
        catch (error) {
            console.log('Error in the createStudent, service layer in students module', error);
            return Promise.reject(error);
        }
    }
    mapToStudentDto(data) {
        let result = new student_dto_1.StudentDto();
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
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [students_repository_1.StudentsRepository])
], StudentsService);
//# sourceMappingURL=students.service.js.map