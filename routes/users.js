const express = require('express');
const router = express.Router();

/* GET users listing. */
function usersRouter(connection, db) {
  router.get('/', async function (req, res, next) {
    // const connection = await connect(); 
    
    const query = req.query.id ? `select first_name, last_name from users where role = 'Vendedor' and id = :id`
      :  `select first_name, last_name from users where role = 'Vendedor'`;
      
    //query to database. Mysql and Oracle modules have different ways to query, this is why the if is needed.
    if (db === 'oracle') {
      try {
        //const results = await connection.execute(query,[req.query.id]);
        const results = req.query.id ? await connection.execute(query, [req.query.id]) : await connection.execute(query, []);   
        res.send(results.rows);
      } catch (err) {
        console.log('Ouch!', err);
        res.statusCode(500);
        res.send('...');
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
