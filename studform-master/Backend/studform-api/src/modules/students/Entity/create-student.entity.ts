import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class students {
  @PrimaryGeneratedColumn()
  studentID: number;

  @Column()
  FirstName: string;

  @Column({ nullable: true })
  MiddleName: string;

  @Column()
  LastName: string;

  @Column()
  FullName: string;

  @Column()
  Dob: string;

  @Column()
  Age: number;

  @Column({ unique: true })
  PhoneNumber: string;

  @Column()
  Address: string;

  @Column({ unique: true })
  Email: string;

  @Column()
  Gender: string;

  @Column()
  Course: string;
}