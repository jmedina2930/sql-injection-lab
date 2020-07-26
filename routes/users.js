const express = require('express');
const router = express.Router();

/* GET users listing. */
function usersRouter(connection, db) {
  router.get('/', async function (req, res, next) {
    // const connection = await connect();
    const query = req.query.id ? `select first_name, last_name from users where id = ${req.query.id} and role = 'Vendedor'`
      : `select first_name, last_name from users where role = 'Vendedor'`;

      /**
       * ===================================================================================
       * Creamos una nueva query que impide ataques de tipo sqlInjection usando parametros
       * ===================================================================================
       */
    const query2 = req.query.id ? `select first_name, last_name from users where id = ? and role = 'Vendedor'`
    : `select first_name, last_name from users where role = 'Vendedor'`;

    // query to database. Mysql and Oracle modules have different ways to query, this is why the if is needed.
    if (db === 'oracle') {
      try {
        const results = await connection.execute(query, []);
        res.send(results.rows);
      } catch (err) {
        console.log('Ouch!', err)
      }
    } else {
      /**
       * Agregamos la nueva query y anezamos el parametro que llega por la url a la consulta
       */
      const request = connection.query(query2, req.query.id ,(error, results, fields) => {
        if (error) throw error;
        res.send(results);
      })
      console.log(request.sql)
    }
  });
  return router;
}
module.exports = usersRouter;

