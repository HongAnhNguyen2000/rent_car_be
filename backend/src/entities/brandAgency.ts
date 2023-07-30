import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'brand_agencies' })
export class BrandAgency {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 50, unique: true, nullable: false })
  brandName: string;

  @Column({ length: 50, nullable: false })
  country: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}