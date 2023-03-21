const express = require('express');
const connection = require('../db');

const router= express.Router();

router.get('/', (req,res)=>{
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

router.post('/', (req,res)=>{
  let body=req.body;
  let get=`INSERT into users (name,lastName, email,password) VALUES ('${req.body.name}','${req.body.lastName}','${req.body.email}','${req.body.password}')`;
  connection.query(get, function (error, results, fields){
      if(error) throw error;
      res.send(results)
  })
 
})

router.patch('/:id', (req, res) => {
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

router.delete('/:id', (req,res)=>{
  let id=req.params.id;
  let query=`DELETE FROM users WHERE _id=${id}`
  connection.query(query, function (error, results, fields){
    if(error) throw error;
    res.send(results)
})
})

module.exports= router;