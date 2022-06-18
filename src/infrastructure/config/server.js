const path = require('path');
const fs = require('fs');
const cors = require('cors');
const express = require('express');
const db = require('../storage/pgsql/models');

if (process.env.NODE_ENV != 'production') require('dotenv').config({ path: path.join(process.cwd(), '.env') });
class Server {
  constructor() {
    this.PORT = process.env.PORT;
    this.app = express();
    this.setUpMiddlewares();
    this.setUpRoutes();
  }

  setUpMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  setUpRoutes() {
    const router = express.Router();
    this.app.use('/api', router);
    Promise.all(
      fs.readdirSync(`${__dirname}/../http/routes`).map(async (file) => {
        if (!file.includes('.test.')) {
          (await import(`../http/routes/${file}`)).default(router);
        }
      }),
    );
  }

  async setUpDB() {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  }

  startListening() {
    this.app.listen(this.PORT, () => {
      console.log(`Server listening on port ${this.PORT}`);
    });
  }
}

module.exports = Server;
