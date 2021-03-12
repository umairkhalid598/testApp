const dotEnv = require("dotenv");

const result = dotEnv.config();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const winston = require("winston");
const expressValidator = require("express-validator");
const cors = require("cors");
const pageNotFound = require("./helper/notFound");
const swaggerDocument = require("../swagger.json");
const errorHandler = require("./helper/errorHandler");
const routes = require("./routes");

if (result.error) {
  throw result.error;
}

const app = express();
const port = process.env.PORT || 4000;

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "stacktrace.log" }),
  ],
});

logger.add(new winston.transports.Console({
  format: winston.format.simple(),
}));

app.use(cors());
app.use(morgan("dev"));

// Parsing incoming requests.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(expressValidator());

routes(app);
app.use(pageNotFound);
app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
