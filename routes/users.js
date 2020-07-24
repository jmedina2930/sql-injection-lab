const express = require('express');
const router = express.Router();

/* GET users listing. */
function usersRouter(connection, db) {
  router.get('/', async function (req, res, next) {
    // const connection = await connect();
    var entry= req.query.id 
    const query =  `select first_name, last_name from users where id = :ide and role = 'Vendedor'` ;
    const query1= `select first_name, last_name from users where role = 'Vendedor'`;

    // query to database. Mysql and Oracle modules have different ways to query, this is why the if is needed.
    if (db === 'oracle') {
      try {
      if(entry == undefined){
    
        const results1 = await connection.execute(query1, []);
        res.send(results1.rows);
      }
      else{
        const results = await connection.execute(query, [entry]);
        res.send(results.rows);
      }
      }
      catch (err) {
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
