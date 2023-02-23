export default {
  dev: {
    username: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    host: process.env.MYSQL_DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  stage: {
    username: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    host: process.env.MYSQL_DB_HOST,
    dialect: process.env.DB_DIALECT
  },
  production: {
    username: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    host: process.env.MYSQL_DB_HOST,
    dialect: process.env.DB_DIALECT
  }
};