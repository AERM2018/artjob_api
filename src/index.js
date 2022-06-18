const Server = require('./infrastructure/config/server');

const server = new Server();
server
  .setUpDB()
  .then(() => server.startListening())
  .catch((error) => console.log("Couldn't connect to database: " + error));
