import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Showroom {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100})
  name: string;

  @Column({ type: 'number', default: null })
  longtitude: number;

  @Column({ type: 'number', default: null })
  lattitude: number;

  @Column({ type: 'varchar', length: 100 })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  manager: string;

  @Column({ type: 'varchar', length: 100 })
  contactPhone: string;

  @Column({ type: 'varchar', length: 100, default: null })
  contactEmail: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}
