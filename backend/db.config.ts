import { join } from 'path';

let entities = ['src/api/**/entity/*.ts'];
let migrations = ['src/migrations/*.ts'];

if (process.env.NODE_ENV === 'production') {
  entities = ['src/api/**/entity/*.js'];
  migrations = ['src/migrations/*.js'];
}

const config = {
  type: process.env.TYPEORM_CONNECTION as any,
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT, 10),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: entities,
  migrations: migrations,
  migrationsTableName: 'migrations',
  synchronize: false
  // synchronize: process.env.NODE_ENV !== 'production'
  // debug: true
};

export { config };
