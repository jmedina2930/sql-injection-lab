const express = require('express');
const { poolIncrement } = require('oracledb');
const router = express.Router();


/* GET users listing. */
function usersRouter(connection, db) {
  router.get('/', async function (req, res, next) {
    // const connection = await connect();
    const ident = req.query.id;

    // query to database. Mysql and Oracle modules have different ways to query, this is why the if is needed.
    
      const request = connection.query(ident? `select first_name, last_name from users where id = ? and role = 'Vendedor'`
      : `select first_name, last_name from users where role = 'Vendedor'`, [ident] , (error, results, fields) => {
        if (error) throw error;
        res.send(results);
      })
      console.log(request.sql)
    
  });
  return router;
}
module.exports = usersRouter;
