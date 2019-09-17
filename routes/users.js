const mysql = require('mysql');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const connection = await connect();
  query = req.query.id ? `select first_name, last_name from users where id = ${req.query.id} and role = 'vendedor'`
    : `select first_name, last_name from users where role = 'vendedor'`

  const request = await connection.query(query, (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  })
  console.log(request.sql)
  // res.send('respond with a resource');
});

async function connect() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'lab'
  });
  await connection.connect((err) => {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });
  return connection;
}

module.exports = router;
