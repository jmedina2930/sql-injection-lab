# Repository to database laboratory - Universidad de Antioquia

Expressjs app vulnerable to SQL injection. To run this app you need to have nodejs installed as well as a mysql or an Oracle instance running. You use the Oracle instance you have used in prior labs or you can have a mysql instance in a docker container with the following commands:

# Solucion
#### 1. Por medio de SQL injection obtener todos los usuarios del sistema incluyendo los que tienen role diferente a "vendedor".


### sentencia original
```
    select first_name, last_name from users where id = ${req.query.id} and role = 'Vendedor'` 
```
### - Algunas posibles inyecciones

#### Inyeccion N°1
``` 
* 1 OR 1=1 --  como parametro rest ==> 1%20OR%201=1%20--

Sustentación: 

En este caso se reemplaza el valor de id con un valor arbitriario `1`, seguido de cualquier tautologia como `1=1`  mediante un OR y por ultimo se agregan dos guiones altos `--` para anular las demas condiciones que puedan estar a la derecha.

Quedando la sentencia WHERE de la siguiente manera: 
    WHERE id = 1 OR 1=1 -- and role = 'Vendedor'`
```

#### Inyección N°2
```
* 1 OR '1'='1' or role='hola_mundo'   como parametro rest ==>       1%20OR%20'1'='1'%20or%20role='hola_mundo'

Sustentación:

En este caso se reemplaza el valor esperado (1 por ejemplo) por el `1`, seguido de una tautologia cualquiera como "1"="1", luego seguido de una condicion cualquiera siempre y cuando sea valida en el lenguaje de SQL y el esquema de la tabla.

Quedando la sentencia WHERE de la siguiente manera: 
    * WHERE id = 1 OR '1'='1' or role='hola_mundo' and role = 'Vendedor'

Para entender como funciona esta inyeccion debemos de analizar el funcionamiento de la agrupacion entre los operadores logicos AND, OR.
La siguiente expresion es equivalente a la resultante tras aplicar la inyección, pero se se vana a gregar parentesis para ver como se agruparon las condicion es y asi poder entener por que funciona la inyeccion.

WHERE (id = 1 OR '1'='1') or (role='hola_mundo' and role = 'Vendedor')
    * Se puede notar que la primera expresion es una tautologia por lo cual la segunda expresion no se valida.


```

### 2. Realizar los cambios necesarios en el código para prevenir SQL injection. Puede utilizar Parameterized Statement o un ORM.

Para realizar este numeral se hizo uso de una herramienta para la libreria mysql ( ver. https://www.npmjs.com/package/mysql ), la implementacion de dichos cambios estan en el archivo  "routes/usersNoInjection.js".

Se puede verificar que las inyecciones del numeral anterior no funcionan cuando se usa esta implementación.
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
