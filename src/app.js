import express from 'express';
import mongoose from 'mongoose';
import requireDir from 'require-dir';
import client from './routes/client';
import user from './routes/user';
import index from './routes/index';
// import routas_cliente from './routes/cliente';
// import routas_usuario from './routes/usuario';

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
        this.server.use('/api/', index);
        this.server.use('/api/cliente', client);
        this.server.use('/api/usuario', user);
    }

    dbmodels() {
        mongoose.connect('mongodb://localhost:27017/Catalapp', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });

        requireDir('./models');
    }

}

export default new App().server;
