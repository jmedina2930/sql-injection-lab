const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

// Change this constant to 'mysql' if you want to work with MySQL database
const db = "mysql";

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

require("./config/database")(db)
  .then((connection) => {
    app.use("/", indexRouter);
    app.use("/users", usersRouter(connection, db));
  })
  .catch((err) => console.error(err));

module.exports = app;
