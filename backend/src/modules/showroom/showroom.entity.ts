// import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// @Entity()
// export class Showroom {

//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column({ type: 'varchar', length: 100})
//   name: string;

//   @Column({ type: 'number', default: null })
//   longtitude: number;

//   @Column({ type: 'number', default: null })
//   lattitude: number;

//   @Column({ type: 'varchar', length: 100 })
//   address: string;

//   @Column({ type: 'varchar', length: 100 })
//   manager: string;

//   @Column({ type: 'varchar', length: 100 })
//   contactPhone: string;

//   @Column({ type: 'varchar', length: 100, default: null })
//   contactEmail: string;

//   @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
//   createdAt: Date;

//   @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
//   updatedAt: Date;
// }


const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Assuming you have a Sequelize instance initialized

const Showroom = sequelize.define('Showroom', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  longtitude: {
    type: DataTypes.FLOAT,
    defaultValue: null
  },
  lattitude: {
    type: DataTypes.FLOAT,
    defaultValue: null
  },
  address: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  manager: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  contactPhone: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  contactEmail: {
    type: DataTypes.STRING(100),
    defaultValue: null
  },
  createdAt: {
    type: DataTypes.DATE(6),
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE(6),
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  }
}, {
  tableName: 'showrooms',
  timestamps: true
});

module.exports = Showroom;
