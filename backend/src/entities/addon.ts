import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'addons' })
export class Addon {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 50, unique: true, nullable: false })
  title: string;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ length: 100, nullable: false })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}