const express = require('express');
const connection = require('../db');

const router= express.Router();

router.get('/', (req,res)=>{
    let get="SELECT * from articles";
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
  let get=`INSERT into articles (title,slug,content,date,imagen,author,image1,content1,image2,content2,image3,content3,image4,content4,image5,content5) VALUES ('${req.body.title}','${req.body.slug}','${req.body.content}','${req.body.date}','${req.body.imagen}','${req.body.author}','${req.body.image1 || ''}','${req.body.content1 || ''}','${req.body.image2 || ''}','${req.body.content2 || ''}','${req.body.image3 || ''}','${req.body.content3 || ''}','${req.body.image4 || ''}','${req.body.content4 || ''}','${req.body.image5 || ''}','${req.body.content5 || ''}')`;
  connection.query(get, function (error, results, fields){
      if(error) throw error;
      res.send(results)
  })
 
})

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const allowedUpdates = ['title','slug','content','date','imagen','author','image1','content1','image2','content2','image3','content3','image4','content4','image5','content5'];
  const updatesToApply = {};

  for (const key in updates) {
    if (allowedUpdates.includes(key)) {
      updatesToApply[key] = updates[key];
    }
  }

  if (Object.keys(updatesToApply).length === 0) {
    return res.status(400).send('No updates provided');
  }

  const updateQuery = `UPDATE articles SET ? WHERE _id = ?`;
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
  let query=`DELETE FROM articles WHERE _id=${id}`
  connection.query(query, function (error, results, fields){
    if(error) throw error;
    res.send(results)
})
})

module.exports= router;