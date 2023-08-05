import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Car } from './car';
import { CarImageTypeEnum } from '../utils/const';

@Entity({ name: 'car_images' })
export class CarImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Car)
  car: Car;

  @Column({ type: 'enum', enum: CarImageTypeEnum, nullable: false })
  type: number;

  @Column({ length: 100, nullable: false })
  link: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}