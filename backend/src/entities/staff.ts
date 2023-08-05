import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user';
import { Showroom } from './showroom';
import { StaffTypeEnum } from '../utils/const';

@Entity({ name: 'staffs' })
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Showroom)
  showroom: Showroom;

  @Column({ type: 'enum', enum: StaffTypeEnum })
  role: number;

  @Column({ length: 100, nullable: true })
  department: string | null;

  @Column({ length: 100, nullable: true })
  position: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}