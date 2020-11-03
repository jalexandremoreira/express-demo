const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const morgan = require("morgan"); //logs whatever requests are sent to the server
const helmet = require("helmet");
const Joi = require("joi");
const logger = require("./middleware/logger");
const courses = require("./routes/courses");
const home = require("./routes/home");
const express = require("express");
const app = express();

app.use(express.json());
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);
app.use(logger);

app.set("view engine", "pug");
app.set("views", "./views");

//configuration
// console.log("Application name: ", config.get("name"));
// console.log("Mail server name: ", config.get("mail.host"));
// console.log("Mail password: ", config.get("mail.password")); //nao funciona... merda das local environments no windows.

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled");
  dbDebugger("DB enabled");
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
