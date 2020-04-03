import express from 'express';
import mongoose from 'mongoose';
import requireDir from 'require-dir';
import routes from './routes/routes';

class App {
  constructor() {
    this.server = express();

    this.dbmodels();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use('/api/', routes);
    this.server.use('/api/client', routes);
    this.server.use('/api/user', routes);
  }

  dbmodels() {
    mongoose.connect('mongodb://localhost:27017/Catalapp', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });

    requireDir('./models');
  }

}

export default new App().server;
