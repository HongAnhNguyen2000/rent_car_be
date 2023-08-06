import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BrandAgency } from './brandAgency';

@Entity({ name: 'cars' })
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => BrandAgency)
  agent: BrandAgency;

  @Column({ length: 50, unique: true, nullable: false })
  title: string;

  @Column({ type: 'int', nullable: false })
  capacity: number;

  @Column({ length: 100, nullable: false })
  policy: string;

  @Column({ type: 'int', nullable: false })
  seat: number;

  @Column({ type: 'int', nullable: false })
  chargingLevel: number;

  @Column({ type: 'float', nullable: false })
  range: number;

  @Column({ type: 'float', nullable: false })
  importedPrice: number;

  @Column({ type: 'float', nullable: true })
  hourlyPrice: number;

  @Column({ type: 'float', nullable: true })
  dailyPrice: number;

  @Column({ type: 'float', nullable: true })
  monthlyPrice: number;

  @Column({ type: 'float', nullable: true })
  discount: number;

  @Column({ length: 100, nullable: false })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}