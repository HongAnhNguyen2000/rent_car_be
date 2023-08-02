import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity({ name: 'profile' })
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;
    
  @ManyToOne(() => User)
  user: User;

  @Column({ length: 50, nullable: false })
  lastName: string;

  @Column({ length: 50, nullable: false })
  firstName: string;

  @Column({ length: 11, nullable: false })
  phoneNumber: string;

  @Column({ length: 20, nullable: false })
  CCID: string;

  @Column({ length: 50, nullable: false })
  language: string;

  @Column({ length: 100, nullable: false })
  address: string;
    
  @Column({ length: 100, nullable: false })
  avatar: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
