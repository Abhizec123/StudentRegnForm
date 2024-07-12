import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { StudentsRepository } from './repo/students.repository'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { students } from './Entity/create-student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([students]), 
  ],
  controllers: [StudentsController],
  providers: [
    { provide: 'IStudentsService', useClass: StudentsService },
    { provide: 'IStudentsRepository', useClass: StudentsRepository },
  ],
})
export class StudentsModule {}
