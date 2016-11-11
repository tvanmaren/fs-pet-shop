'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 8000;

// const path = require('path');
const fs = require('fs');
const database = './pets.json';


app.use(express.static('public'));

app.get('/pets', (req, res, next) => {
    fs.readFile(database, 'utf8', (err, data) => {
        // if (err) {
        //     console.error(err.stack);
        //     return res.sendStatus(500);
        // }
        let dataStore = JSON.parse(data);
        res.send(dataStore);
    });
});

app.get('/pets/:id', (req, res, next) => {
    const index = +req.params.id;

    fs.readFile(database, 'utf8', (err, data) => {
        // if (err) {
        //     console.error(err.stack);
        //     return res.sendStatus(500);
        // }

        let dataStore = JSON.parse(data);
        if (isNaN(index) || index < 0 || index >= dataStore.length) {
            // res.set('Content-Type', 'text/plain');
            res.sendStatus(404);
        }
        res.send(dataStore[index]);
    });
});

app.post('/pets', (req, res, next) => {
    const newPet = req.body;

    newPet.age = Number.parseInt(newPet.age); //convert age to integer
    if ((!newPet) || !(newPet.age && typeof newPet.age === 'number') || !(newPet.kind && typeof newPet.kind === 'string') || !(newPet.name && typeof newPet.name === 'string')) {
        return res.sendStatus(400);
    }

    fs.readFile(database, 'utf8', (err, data) => {
        // if (err) {
        //     console.error(err.stack);
        //     return res.sendStatus(500);
        // }
        let dataStore = JSON.parse(data);
        dataStore.push(newPet);
        fs.writeFile(database, JSON.stringify(dataStore), (err) => {
            return res.status(200).send(newPet);
        });
    });
});

app.put('/pets/:id', (req, res, next) => {
    const newPet = req.body;
    const index = +req.params.id;

    newPet.age = Number.parseInt(newPet.age); //convert age to integer
    if ((!newPet) || !(newPet.age && typeof newPet.age === 'number') || !(newPet.kind && typeof newPet.kind === 'string') || !(newPet.name && typeof newPet.name === 'string')) {
        return res.sendStatus(400);
    }

    fs.readFile(database, 'utf8', (err, data) => {
        // if (err) {
        //     console.error(err.stack);
        //     return res.sendStatus(500);
        // }
        let dataStore = JSON.parse(data);

        if (index >= 0 && index < dataStore.length) {
            dataStore[index] = newPet;
            fs.writeFile(database, JSON.stringify(dataStore), (err) => {
                return res.status(200).send(newPet);
            });
        }
        // else {
        //     return res.sendStatus(500);
        // }

    });
});

app.delete('/pets/:id', (req, res, next) => {
    const index = +req.params.id;

    fs.readFile(database, 'utf8', (err, data) => {
        // if (err) {
        //     console.error(err.stack);
        //     return res.sendStatus(500);
        // }
        let dataStore = JSON.parse(data);
        if (index >= 0 && index < dataStore.length) {
            let deletedPet = dataStore.splice(index, 1)[0];
            fs.writeFile(database, JSON.stringify(dataStore), (err) => {
                res.send(deletedPet);
            });
        }
        // else {
        //     return res.sendStatus(400);
        // }
    });
});

app.use((req, res, next) => {
    return res.sendStatus(404);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.sendStatus(500);
});

app.listen(port, () => {
    console.log(`Now listening @ port:${port}`);
});

module.exports = app;
