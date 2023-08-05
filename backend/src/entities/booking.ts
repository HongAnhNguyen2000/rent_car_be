import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BookingStatusEnum, BookingTypeEnum, PaymentStatusEnum, PaymentTypeEnum } from '../utils/const';
import { Insurance } from './insurance';
import { Customer } from './customer';
import { SpecificCar } from './specificCar';

@Entity({ name: 'bookings' })
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Customer)
  customer: Customer;

  @ManyToOne(() => SpecificCar)
  specificCar: SpecificCar;

  @ManyToOne(() => Insurance)
  insurance: Insurance;

  @Column({ type: 'enum', enum: BookingTypeEnum, nullable: false })
  type: number = BookingTypeEnum.ByHour;

  @Column({ type: 'enum', enum: BookingStatusEnum, nullable: false })
  status: number = BookingStatusEnum.Holding;

  @Column({ type: 'timestamp' })
  startAt: Date;

  @Column({ type: 'timestamp' })
  endAt: Date;
  
  @Column({ type: 'timestamp' })
  pickupAt: Date;
  
  @Column({ length: 120, nullable: false })
  driverFirstName: string;

  @Column({ length: 120, nullable: false })
  driverLastName: string;

  @Column({ length: 120, nullable: false })
  driverPhoneNumber: string;

  @Column({ length: 120, nullable: false })
  driverEmail: string;

  @Column({ length: 120, nullable: false })
  driverLicense: string;

  @Column({ length: 120, nullable: true })
  driverFlightNumer: string;

  @Column({ type: 'enum', enum: PaymentTypeEnum, nullable: false })
  paymentType: number = PaymentTypeEnum.InternationalTransfer;;

  @Column({ type: 'enum', enum: PaymentStatusEnum, nullable: false })
  paymentStatus: number = PaymentStatusEnum.New;;

  @Column({ length: 120, nullable: true })
  paymentCode: string;

  @Column({ type: 'timestamp' })
  paymentAt: Date;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ type: 'float', nullable: false })
  discount: number;

  @Column({ type: 'float', nullable: false })
  amount: number;

  @Column({ type: 'float', nullable: false })
  paid: number;

  @Column({ type: 'int', nullable: false })
  powerLeft: number;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}