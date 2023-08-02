import { DataSource } from 'typeorm';
import { config } from '../../db.config';

export const dataSource: DataSource = new DataSource(config);
