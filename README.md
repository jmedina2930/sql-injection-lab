# Repository to database laboratory - Universidad de Antioquia

Expressjs app vulnerable to SQL injection. To run this app you need to have nodejs installed as well as a mysql instance running. You can have a mysql instance in a docker container with the following commands:

```
docker pull mysql

docker run --name db-lab-mysql --rm -p 3306:3306 -e MYSQL_DATABASE=lab -e MYSQL_ROOT_PASSWORD=root -d mysql:5.7.22
```

When you have your mysql instance running you need to set connection info in ```routes/users.js``` as is shown bellow:
```
const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'db-user',
    password: 'db-pass',
    database: 'lab'
  });
```

You also need to have a table called users with the next config: 
```
CREATE TABLE users(
	id int(10) PRIMARY KEY,
    first_name varchar(45) not null,
	last_name varchar(45) not null,
    role varchar(10) not null);
```

And then, insert the next test data:
```
insert into users values (1, 'Alberto', 'Contreras', 'Vendedor');
insert into users values (2, 'Beatrice', 'Kanalas', 'Vendedor');
insert into users values (3, 'Tom', 'Kiwitz', 'Manager');
```

To run the application, first at all, you need to install node libraries with ```npm install```, then you can run it with ```npm start``` or with ```npm run debug``` to follow changes in the code and recharge aoutomatically.

Finally to test you can use a browser and go to ```localhost:3000/users```. This endpoint will bring all the users with role vendedor. You also can apply a filter by id sending user id as a parameter, for instance: ```?id=1```. An example of SQL injection would be ```?id=1 or 1=1; --```.  
