const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const userRouterNoInjectioin = require("./routes/usersNoInjection");

// Change this constant to 'mysql' if you want to work with MySQL database
const db = "mysql"// "oracle";

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

require("./config/database")(db)
  .then((connection) => {
    app.use("/", indexRouter);
    // vulnerable a la injection
    app.use("/users", usersRouter(connection, db));
    // protegida ante injectiones
    app.use("/usersNoInjection", userRouterNoInjectioin(connection, db));
  })
  .catch((err) => console.error(err));

module.exports = app;
