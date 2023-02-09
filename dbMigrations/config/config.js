export default {
  dev: {
    username: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    host: process.env.MYSQL_DB_HOST,
    dialect: 'mysql'
  },
  stage: {
    username: process.env.STAGE_DB_USERNAME,
    password: process.env.STAGE_DB_PASSWORD,
    database: process.env.STAGE_DB_NAME,
    host: process.env.STAGE_DB_HOST,
    dialect: 'mysql'
  },
  prod: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST,
    dialect: 'mysql'
  }
};