const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes')

const app=express();
const port = process.env.PORT || 8000;
const whitelist = ['file:///C:/Users/deiby/Desktop/temp/conectionmysql/index.html'];
const options ={
  origin: (origin, callback) =>{
    if(whitelist.includes(origin) || !origin){
      callback(null, true);

    }else{
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors());

//ESTOS DOS SE necesitan para poder leer el req.body y el req.params
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routerApi(app)


app.listen(port, ()=>{
    console.log("escuchando en el puerto 3000")
})
