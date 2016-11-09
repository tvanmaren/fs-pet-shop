#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');

const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];

const database = './pets.json';
const usage = `Usage: ${node} ${file}`;

if (cmd === 'read') {
    const index = +process.argv[3];

    fs.readFile(database, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        let dataStore = JSON.parse(data);
        if (isNaN(index)) {
            console.log(dataStore);
        } else if (index >= 0 && index < dataStore.length) {
            console.log(dataStore[index]);
        } else {
            console.error(`${usage} read INDEX`);
            process.exit(1);
        }
    });
}

if (cmd === 'create') {
    const age = +process.argv[3];
    const kind = process.argv[4];
    const name = process.argv[5];

    if (!age || !kind || !name) {
        console.error(`${usage} create AGE KIND NAME`);
        process.exit(1);
    } else {
        fs.readFile(database, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            let dataStore = JSON.parse(data);
            let created = {
                age,
                kind,
                name
            };
            dataStore.push(created);
            fs.writeFile(database, JSON.stringify(dataStore), (err) => {
                if (err) {
                    throw err;
                }
                console.log(created);
            });
        });
    }
}

if (cmd === 'update') {
    const index = +process.argv[3];
    const age = +process.argv[4];
    const kind = process.argv[5];
    const name = process.argv[6];

    if (!index || !age || !kind || !name) {
        console.error(`${usage} update INDEX AGE KIND NAME`);
        process.exit(1);
    } else {
        fs.readFile(database, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            let dataStore = JSON.parse(data);

            if (index >= 0 && index < dataStore.length) {
                let created = {
                    age,
                    kind,
                    name
                };
                dataStore[index] = created;
                fs.writeFile(database, JSON.stringify(dataStore), (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log(created);
                });
            } else {
                console.error(`${usage} update INDEX AGE KIND NAME`);
                process.exit(1);
            }

        });
    }
}

if (cmd === 'destroy') {
    const index = +process.argv[3];

    fs.readFile(database, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        let dataStore = JSON.parse(data);
        if (index >= 0 && index < dataStore.length) {
            console.log(dataStore.splice(index, 1)[0]);
            fs.writeFile(database, JSON.stringify(dataStore), (err) => {
                if (err) {
                    throw err;
                }
            });
        }
        else {
            console.error(`${usage} destroy INDEX`);
            process.exit(1);
        }
    });
} else {
    if (!cmd) {
        console.error(usage, `[read | create | update | destroy]`);
        process.exit(1);
    }
}
