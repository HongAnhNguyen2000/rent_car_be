const config = {
  type: process.env.DB_CONNECTION as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 3306) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: false,
  // synchronize: true,
  cli: {
    entitiesDir: "src/entities/*.ts",
    migrationsDir: "src/migrations/*.ts"
  }
};

export { config };