'use strict';

const express=require('express');
const app=express();
const port=8000;

const path=require('path');
const fs=require('fs');
const database = './pets.json';


app.use(express.static('public'));

app.get('/pets', (req,res,next)=>{
  fs.readFile(database, 'utf8', (err, data) => {
      if (err) {
          throw err;
      }
      let dataStore = JSON.parse(data);
      res.send(dataStore);
  });
});

app.get('/pets/:id', (req,res,next)=>{
  // fs.readFile(database, 'utf8', (err, data) => {
  //     if (err) {
  //         throw err;
  //     }
  //     let dataStore = JSON.parse(data);
  //     if (isNaN(index)) {
  //         console.log(dataStore);
  //     } else if (index >= 0 && index < dataStore.length) {
  //         console.log(dataStore[index]);
  //     } else {
  //         console.error(`${usage} read INDEX`);
  //         process.exit(1);
  //     }
  // });
});

app.post('/pets/:id', (req,res,next)=>{

});

app.put('/pets:id', (req,res,next)=>{

});

app.delete('/pets:id', (req,res,next)=>{

});

app.listen(port, ()=>{console.log(`Now listening @ port:${port}`);});
