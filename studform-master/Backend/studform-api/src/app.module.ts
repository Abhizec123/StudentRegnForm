import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './modules/students/students.module';
import { students } from './modules/students/Entity/create-student.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'D:/ARC/POC/Database/studDatabase.db',
      entities: [students],
      synchronize: true,
    }),
    StudentsModule,
  ],
})
export class AppModule {}
