import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Booking } from './booking';
import { Addon } from './addon';

@Entity({ name: 'booking_addons' })
export class BookingAddon {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Booking)
  booking: Booking;

  @ManyToOne(() => Addon)
  addon: Addon;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}