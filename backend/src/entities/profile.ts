import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ length: 50, nullable: true })
  lastName: string;

  @Column({ length: 50, nullable: true })
  firstName: string;

  @Column({ length: 11, nullable: true })
  phoneNumber: string;

  @Column({ length: 20, nullable: true })
  CCID: string;

  @Column({ length: 50, nullable: true })
  language: string;

  @Column({ length: 100, nullable: true })
  address: string;
    
  @Column({ length: 100, nullable: true })
  avatar: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
