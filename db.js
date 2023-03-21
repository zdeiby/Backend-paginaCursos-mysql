const mysql = require('mysql')
require('dotenv').config();
const express = require('express');

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

module.exports = connection;
