import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CarStatusEnum } from '../utils/const';
import { Car } from './car';
import { Showroom } from './showroom';

@Entity({ name: 'specific_cars' })
export class SpecificCar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Car)
  car: Car;

  @ManyToOne(() => Showroom)
  showroom: Showroom;

  @Column({ length: 20, unique: true, nullable: false })
  numberPlate: string;

  @Column({ length: 10 })
  color: string;

  @Column({ type: 'enum', enum: CarStatusEnum, nullable: false })
  status: number = CarStatusEnum.Available;

  @Column({ type: 'timestamp', nullable: true })
  importedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}