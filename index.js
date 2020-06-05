const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const NotificationsRoutes = require('./App/src/Routes/NotificationsRoutes');
const ErroreHandlerMiddleware = require('./App/src/Utils/ErrorHandler');
const { PREFIX } = require('./App/src/Config/AppConfig');
const DB = require('./App/src/Utils/Database');

const { PORT = 3003 } = process.env;


class Server {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    this.app.set('port', PORT);
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.app.use(PREFIX, NotificationsRoutes);
    this.app.use(ErroreHandlerMiddleware.MainHandler);
  }

  start() {
    this.app.listen(this.app.get('port'), () => {
      console.log('SERVER ON PORT ', this.app.get('port'));

      DB.migrate.latest();
    });
  }
}

const server = new Server();
server.start();

module.exports = server.app;
