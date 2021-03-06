const path = require('path');
if (process.env.NODE_ENV != 'production') require('dotenv').config({ path: path.join(process.cwd(), '.env') });
const config = {
  development: {
    username: process.env.DEV_ARTJOB_USER,
    password: process.env.DEV_ARTJOB_PASS,
    database: process.env.DEV_ARTJOB_DB,
    host: process.env.DEV_ARTJOB_HOST,
    dialect: 'postgres',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};

module.exports = config;
