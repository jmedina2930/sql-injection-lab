const express = require('express');
const router = express.Router();

/* GET users listing. */
function usersRouter(connection, db) {
  router.get('/', async function (req, res, next) {
    // const connection = await connect();
    let requestId = req.query.id;
    const query = requestId ? 'SELECT first_name, last_name FROM `users` WHERE `role` = "Vendedor" AND `id` = ?'
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
      const request = connection.query(query, [requestId],(error, results, fields) => {
        if (error) throw error;
        res.send(results);
      })
      console.log(request.sql)
    }
  });
  return router;
}
module.exports = usersRouter;
