import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'showrooms' })
export class Showroom extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  name: string;

  @Column('double')
  longitude: number;

  @Column('double')
  latitude: number;

  @Column({ length: 100 })
  address: string;

  @Column({ length: 50 })
  manager: string;

  @Column({ length: 10 })
  contactPhone: string;

  @Column({ length: 20, nullable: true })
  contactEmail: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}