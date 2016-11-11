'use strict';

const express = require('express');
const app = express();
const port = 8000;

const path = require('path');
const fs = require('fs');
const database = './pets.json';


app.use(express.static('public'));

app.get('/pets', (req, res, next) => {
    fs.readFile(database, 'utf8', (err, data) => {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }
        let dataStore = JSON.parse(data);
        res.send(dataStore);
    });
});

app.get('/pets/:id', (req, res, next) => {
    let index = +req.params.id;
    fs.readFile(database, 'utf8', (err, data) => {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }
        let dataStore = JSON.parse(data);
        console.log(dataStore.length);
        if (isNaN(index) || index < 0 || index >= dataStore.length) {
            res.set('Content-Type', 'text/plain');
            res.sendStatus(404);
        }

        res.send(dataStore[index]);
    });
});

app.post('/pets/:id', (req, res, next) => {

});

app.put('/pets:id', (req, res, next) => {

});

app.delete('/pets:id', (req, res, next) => {

});

// app.use((req, res, next)=>{return req.sendStatus(404);});

app.listen(port, () => {
    console.log(`Now listening @ port:${port}`);
});
