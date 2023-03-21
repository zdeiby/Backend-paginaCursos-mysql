require('dotenv').config();
const mysql = require('mysql');
const express = require('express');
const cors = require('cors')
app=express()
const corsOptions = {
  origin: 'https://pruebas-react.castelancarpinteyro.com'
};

app.use(cors(corsOptions));

const dbHost = process.env.DB_HOST;
const dbUser=process.env.DB_USER;
const dbPassword=process.env.DB_PASSWORD;
const dbName=process.env.DB_NAME;
const dbPort=process.env.DB_PORT;

const connection = mysql.createConnection({
  host     : dbHost,
  port     : dbPort,
  user     : dbUser,
  password : dbPassword,
  database : dbName,

});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});



//ESTOS DOS SE necesitan para poder leer el req.body y el req.params
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', (req,res)=>{
  res.header('Access-Control-Allow-Origin', 'https://pruebas-react.castelancarpinteyro.com');
    let get="SELECT * from users";
    connection.query(get, function (error, results, fields){
        if(error) throw  res.json({
          error:error,
          body:''
        });
        res.json({
          error:'',
          body:results
        })
    })
   
})

app.post('/users', (req,res)=>{
  let body=req.body;
  let get=`INSERT into users (name,lastName, email,password) VALUES ('${req.body.name}','${req.body.lastName}','${req.body.email}','${req.body.password}')`;
  connection.query(get, function (error, results, fields){
      if(error) throw error;
      res.send(results)
  })
 
})

app.patch('/users/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const allowedUpdates = ['name', 'lastName', 'email', 'password'];
  const updatesToApply = {};

  for (const key in updates) {
    if (allowedUpdates.includes(key)) {
      updatesToApply[key] = updates[key];
    }
  }

  if (Object.keys(updatesToApply).length === 0) {
    return res.status(400).send('No updates provided');
  }

  const updateQuery = `UPDATE users SET ? WHERE _id = ?`;
  const values = [updatesToApply, id];

  connection.query(updateQuery, values, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error updating user');
    } else if (results.affectedRows === 0) {
      res.status(404).send(`User with id ${id} not found`);
    } else {
      res.send(`User with id ${id} updated successfully`);
    }
  });
});

app.delete('/users/:id', (req,res)=>{
  let id=req.params.id;
  let query=`DELETE FROM users WHERE _id=${id}`
  connection.query(query, function (error, results, fields){
    if(error) throw error;
    res.send(results)
})
})


app.listen(3000, ()=>{
    console.log("escuchando en el puerto 3000")
})
