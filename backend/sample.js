 const express = require('express');
 const { Pool, Client } = require('pg');

 const connectionString = 'postgres://postgres:pass1245@127.0.0.1:5432/teamworkDB';
 const bodyParser = require('body-parser');
 const app = express();
 const client = new Client({
     connectionString: connectionString
 });
 client.connect();


 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));
 // client.query('SELECT * from employees ', (err, res) => {
 //     console.log(err, res);
 //     client.end();
 // })
 app.post('/', (req, res, next) => {
     client.query(`INSERT INTO employees(firstname, lastname, email, upassword,
    sex, gender, jobrole, department, address )
     VALUES( 'yunus', 'olusola', 'sola@yahoo.com', '1234', 'M', 'male', 'IT' , 'IT', 'No5'  )`, [req.body.firstname, req.body.lastname], (err, res, req) => {
         console.log(err, res, req);
         client.end();
     });
 });


 exports.modules = app;