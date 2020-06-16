import express from "express";
import mongoose from "mongoose";
import requireDir from "require-dir";
import client from "./routes/client";
import user from "./routes/user";
import index from "./routes/index";
import aws from "aws-sdk";
import credentials from "../credentials";
import { S3 } from "aws-sdk";

// import routas_cliente from './routes/cliente';
// import routas_usuario from './routes/usuario';

class App {
  constructor() {
    this.server = express();

    this.dbmodels();
    this.middlewares();
    this.routes();
    this.s3();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use("/api/", index);
    this.server.use("/api/cliente", client);
    this.server.use("/api/usuario", user);
  }

  dbmodels() {
    mongoose.connect("mongodb://localhost:27017/Catalapp", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    requireDir("./models");
  }
  async s3() {
    const id = credentials.AMAZON_ACCESS_KEY_ID;
    const secret = credentials.SECRET_ACCESS_KEY;

    console.log(credentials.AMAZON_ACCESS_KEY_ID);

    const s3 = new S3({
      accessKeyId: id,
      secretAccessKey: secret,
    });

    // var keyName = "hello_world.txt";

    // const upload = await s3
    //   .upload({
    //     Bucket: "index325-bucket-tcc",
    //     Key: "hello_world.txt",
    //     Body: "testando123",
    //     ACL: "public-read"
    //   })
    //   .promise();
  }
}

export default new App().server;
