  
const express = require('express');
const router = express.Router();


/*Trabajo realizado por: 
Laura Daniela Monsalve
Andrea Calderón Zuluaga */


/* GET users listing. */
function usersRouter(connection, db) {
  router.get('/', async function (req, res, next) {
    // const connection = await connect();
    const query = req.query.id ? `select first_name, last_name from users where role = 'Vendedor' and id = :id`
      : `select first_name, last_name from users where role ='Vendedor'`;

    // query to database. Mysql and Oracle modules have different ways to query, this is why the if is needed.
    if (db === 'oracle') {
        try {
          const results = req.query.id ? await connection.execute(query, [req.query.id]): await connection.execute(query, []);
          res.send(results.rows);
        } catch (err) {
          console.log('Ouch!', err);
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

/* Solución punto 3: http://localhost:3000/users?id='' or 1=1-- */