const express = require('express');
const router = express.Router();

/* GET users listing. */
function usersRouter(connection, db) {
  router.get('/', async function (req, res, next) {
    // const connection = await connect();
    const id = req.query.id;
    const query = id? `select first_name, last_name from users where role = 'Vendedor' and id = :id`
        : `select first_name, last_name from users where role = 'Vendedor'`;

    // query to database. Mysql and Oracle modules have different ways to query, this is why the if is needed.
    if (db === 'oracle') {
      try {
        const results = await connection.execute(
          query,
          id
          );
        res.send(results.rows);
      } catch (err) {
        console.log('Ouch!', err)
      }
    } else {
      const request = connection.query(query, (error, results, fields) => {
        if (error) throw error;
        res.send(results);
      })
      console.log(request.sql)
    }
  });
  return router;
}
module.exports = usersRouter;

//http://localhost:3000/users?id=1%20or%20id%20=2%20or%20role%20=%20%27Manager%27--
