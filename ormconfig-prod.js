module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [ 'dist/database/entities/*.js' ],
  migrationsTableName: 'migrations',
  migrations: [ 'dist/database/migrations/*.js' ],
  cli: {
    migrationsDir: 'dist/database/migrations',
    entitiesDir: "dist/database/entities",
  },
};