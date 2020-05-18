import app from "./src/app";
import bodyParser from "body-parser";
const port = normalizaPort(process.env.PORT || "3001");
const expressSwagger = require("express-swagger-generator")(app);

let options = {
  swaggerDefinition: {
    info: {
      description: "This is a sample server",
      title: "Swagger",
      version: "1.0.0",
    },
    host: "localhost:3001",
    basePath: "/api",
    produces: ["application/json", "application/xml"],
    schemes: ["http", "https"],
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "",
      },
    },
  },
  basedir: __dirname, //app absolute path
  files: ["./src/routes/*.js"], //Path to the API handle folder
};
expressSwagger(options);

function normalizaPort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// parse application/json
// app.use(bodyParser.json())

require("./src/database");

app.listen(port, function() {
  console.log(`app listening on port ${port}`);
});
