import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'insurances' })
export class Insurance {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 50, unique: true, nullable: false })
  name: string;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ length: 100, nullable: true })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}