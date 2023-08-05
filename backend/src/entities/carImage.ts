import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Car } from './car';

@Entity({ name: 'car_images' })
export class CarImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Car)
  car: Car;

  @Column({ type: 'enum', enum: [0, 1], nullable: false })
  type: number;

  @Column({ length: 100, nullable: false })
  link: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}