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
exports.StudentsController = void 0;
const common_1 = require("@nestjs/common");
const students_service_1 = require("./students.service");
const validate_phone_dto_1 = require("./dto/validate-phone.dto");
const validate_email_dto_1 = require("./dto/validate-email.dto");
const create_student_dto_1 = require("./dto/create-student.dto");
const delete_student_dto_1 = require("./dto/delete-student.dto");
let StudentsController = class StudentsController {
    constructor(studentsService) {
        this.studentsService = studentsService;
    }
    async getAllStudents() {
        try {
            const students = await this.studentsService.getAllStudents();
            return Promise.resolve(students);
        }
        catch (err) {
            console.log('Error in getAllStudents, controller layer in students Module', err);
            return Promise.reject(err);
        }
    }
    async validatePhoneNumber(validatePhoneDto) {
        const exists = await this.studentsService.phoneNumberExists(validatePhoneDto.phoneNumber);
        return { exists };
    }
    async validateEmail(validateEmailDto) {
        const exists = await this.studentsService.emailExists(validateEmailDto.email);
        return { exists };
    }
    async createStudent(createStudentDto) {
        try {
            const students = await this.studentsService.createStudent(createStudentDto);
            return Promise.resolve(students);
        }
        catch (err) {
            console.log('Error in createStudent, controller layer in students Module', err);
            return Promise.reject(err);
        }
    }
    async updateStudent(createStudentDto) {
        try {
            const students = await this.studentsService.updateStudent(createStudentDto);
            return Promise.resolve(students);
        }
        catch (err) {
            console.log('Error in createStudent, controller layer in students Module', err);
            return Promise.reject(err);
        }
    }
    async deleteStudent(body) {
        try {
            const students = await this.studentsService.deleteStudent(body);
            return Promise.resolve(students);
        }
        catch (err) {
            console.log('Error in createStudent, controller layer in students Module', err);
            return Promise.reject(err);
        }
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getAllStudents", null);
__decorate([
    (0, common_1.Post)('validate-phone'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [validate_phone_dto_1.ValidatePhoneDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "validatePhoneNumber", null);
__decorate([
    (0, common_1.Post)('validate-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [validate_email_dto_1.ValidateEmailDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "validateEmail", null);
__decorate([
    (0, common_1.Post)('add-students'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "createStudent", null);
__decorate([
    (0, common_1.Post)('edit-students'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "updateStudent", null);
__decorate([
    (0, common_1.Post)('delete-students'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_student_dto_1.DeleteStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "deleteStudent", null);
exports.StudentsController = StudentsController = __decorate([
    (0, common_1.Controller)('students'),
    __metadata("design:paramtypes", [students_service_1.StudentsService])
], StudentsController);
//# sourceMappingURL=students.controller.js.map