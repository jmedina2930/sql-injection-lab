const express = require('express');
const router = express.Router();

/* GET users listing. */
function usersRouter(connection, db) {
  router.get('/', async function (req, res, next) {
    // const connection = await connect();
    const query = req.query.id 
      ? `select first_name, last_name from users where id = ? and role = 'Vendedor'`
      : `select first_name, last_name from users where role = 'Vendedor'`;
      
    const paramVAlues= req.query.id ? [req.query.id] : undefined;

    // query to database. Mysql and Oracle modules have different ways to query, this is why the if is needed.
    if (db === 'oracle') {
      try {
        const results = await connection.execute(query, []);
        res.send(results.rows);
      } catch (err) {
        console.log('Ouch!', err)
      }
    } else {

      const request = connection.query(query, paramVAlues, (error, results, fields) => {
        if (error) throw error;
        res.send(results);
      });

      console.log(request.sql);
    }
  });
  return router;
}

/**
 * 
 * @param {*} connection 
 * @param {*} db 
 */
function _usersRouter(connection, db){

  console.log({ DB: db });
  

  router.get('/', async function (req, res, next) {
    // const connection = await connect();
    const query = req.query.id 
      ? `select first_name, last_name from users where id = ${req.query.id} and role = 'Vendedor'`
      : `select first_name, last_name from users where role = 'Vendedor'`;

    // query to database. Mysql and Oracle modules have different ways to query, this is why the if is needed.
    if (db === 'oracle') {
      console.log("USANDO ORACLE LOGIC");
      try {
        const results = await connection.execute(query, []);
        res.send(results.rows);
      } catch (err) {
        console.log('Ouch!', err)
      }
    } else {
      console.log("USANDO MYSQL LOGIC");
      
      // req.query.id = (req.query.id).replace()

      let queryStr =  req.query.id 
        ? "select first_name, last_name from users where id = ? and role = 'Vendedor'"
        : "select first_name, last_name from users where role = 'Vendedor'"

      let queryValues = (req.query.id) ? [req.query.id] : [];

      const request = connection.query(queryStr, queryValues, function (error, results, fields) {
        if (error) throw error;
      });
      
      // const request = connection.query(queryStr, function (error, results, fields) {
      //   if (error) throw error;
      // });

      // connection.query(query, (error, results, fields) => {
      //   if (error) throw error;
      //   res.send(results);
      // })

      console.log(request.sql)
    }
    });
  return router;
  

}

module.exports = usersRouter;