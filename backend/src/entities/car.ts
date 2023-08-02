import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Showroom } from './showroom';
import { BrandAgency } from './brandAgency';

@Entity({ name: 'cars' })
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Showroom)
  showroom: Showroom;

  @ManyToOne(() => BrandAgency)
  agent: Showroom;

  @Column({ length: 50, nullable: false })
  title: string;

  @Column({ type: 'int', nullable: false })
  status: number;

  @Column({ type: 'int', nullable: false })
  capacity: number;

  @Column({ length: 100, nullable: false })
  policy: string;

  @Column({ type: 'int', nullable: false })
  seat: number;

  @Column({ length: 10 })
  color: string;

  @Column({ type: 'int', nullable: false })
  chargingLevel: number;

  @Column({ type: 'float', nullable: false })
  range: number;

  @Column({ type: 'timestamp', nullable: true })
  importedAt: Date;

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