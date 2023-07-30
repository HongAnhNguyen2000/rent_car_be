import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  email: string;

  @Column({ length: 100, nullable: false })
  password: string;

  @Column({ length: 100, nullable: true })
  signature: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLogout: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}