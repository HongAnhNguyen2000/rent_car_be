module.exports = {
  development: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 3306) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      dialect: process.env.DB_CONNECTION || 'mysql',
      logging: process.env.DB_LOGGING || false,
      // modelsPath: "src/modules/**/*.entity.ts",
      // migrationsPath: "src/modules/**/migrations"
      modelsPath: "src/models",
      migrationsPath: "src/migrations"
  }
};

// export { dbConfig };
