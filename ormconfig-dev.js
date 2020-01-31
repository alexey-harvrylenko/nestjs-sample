module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [ 'src/database/entities/*.ts' ],
  migrationsTableName: 'migrations',
  migrations: [ 'src/database/migrations/*.ts' ],
  cli: {
    migrationsDir: 'src/database/migrations',
    entitiesDir: "src/database/entities",
  },
};