# Repository to database laboratory - Universidad de Antioquia

Expressjs app vulnerable to SQL injection. To run this app you need to have nodejs installed as well as a mysql or an Oracle instance running. You use the Oracle instance you have used in prior labs or you can have a mysql instance in a docker container with the following commands:

```
docker pull mysql

docker run --name db-lab-mysql --rm -p 3306:3306 -e MYSQL_DATABASE=lab -e MYSQL_ROOT_PASSWORD=root -d mysql:5.7.22
```

Run a MySQL terminal in docker container: `docker exec -it db-lab-mysql mysql -uroot -p`

When you have wheter your mysql or Oracle instance running you need to set connection info in `config/database.js` as is shown bellow:

```
const host = 'localhost';
const port = 3306;
const user = 'root';
const pass = 'root';
const database = 'lab';
```

You can choose whether to work with Oracle or MySQL changing the value of the constant db in app.js. But if you want to work with Oracle you need to install Oracle insta client: https://www.oracle.com/database/technologies/instant-client/downloads.html

You also need to have a table called users with the next config:

```
CREATE TABLE users(
	id number(10) PRIMARY KEY,
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

To run the application, first at all, you need to install node libraries with `npm install`, then you can run it with `npm start` or with `npm run debug` to follow changes in the code and recharge aoutomatically.

Finally to test you can use a browser and go to `localhost:3000/users`. This endpoint will bring all the users with role vendedor. You also can apply a filter by id sending user id as a parameter, for instance: `?id=1`.
