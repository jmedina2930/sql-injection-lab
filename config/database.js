const host = "localhost";
const port = 3306;
const user = "root";
const pass = "root";
const database = "lab";

async function mysqlConnect() {
  const mysql = require("mysql");
  const connection = await mysql.createConnection({
    host: host,
    port: port,
    user: user,
    password: pass,
    database: database,
  });
  await connection.connect((err) => {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });
  return connection;
}

async function oracleConnect() {
  const oracledb = require("oracledb");
  const config = {
    user: user,
    password: pass,
    connectString: `${host}:${port}/xe`,
  };
  let conn = await oracledb.getConnection(config);
  return conn;
}

async function connectDB(db = "mysql") {
  if (db === "oracle") return oracleConnect();
  return mysqlConnect();
}

module.exports = connectDB;
